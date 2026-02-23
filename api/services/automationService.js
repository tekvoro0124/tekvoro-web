const emailService = require('../services/emailService');
const ContactSubmission = require('../models/index').ContactSubmission;
const User = require('../models/index').User;
const Project = require('../models/index').Project;

class AutomationService {
  constructor() {
    this.workflows = {
      leadCaptureToCRM: this.leadCaptureToCRM.bind(this),
      automatedEmailResponses: this.automatedEmailResponses.bind(this),
      weeklyProjectStatus: this.weeklyProjectStatus.bind(this),
      contentPublishing: this.contentPublishing.bind(this),
      invoiceAutomation: this.invoiceAutomation.bind(this)
    };
  }

  // Lead Scoring Algorithm from Automation Master
  calculateLeadScore(contactData) {
    let score = 0;

    // Budget scoring (0-40 points)
    switch (contactData.budget) {
      case '₹20L+':
      case '₹20L+ (International $10K+)':
        score += 40;
        break;
      case '₹8L - ₹20L':
        score += 30;
        break;
      case '₹3L - ₹8L':
        score += 20;
        break;
      case 'Under ₹3L':
        score += 5;
        break;
    }

    // Timeline scoring (0-25 points)
    switch (contactData.timeline) {
      case 'ASAP (< 1 month)':
        score += 25;
        break;
      case '1-3 months':
        score += 20;
        break;
      case '3-6 months':
        score += 10;
        break;
      case 'Flexible':
        score += 5;
        break;
    }

    // Source scoring (0-20 points)
    switch (contactData.howFoundUs) {
      case 'Referral':
        score += 20;
        break;
      case 'Clutch':
        score += 15;
        break;
      case 'LinkedIn':
        score += 10;
        break;
      case 'Google':
        score += 8;
        break;
      default:
        score += 5;
        break;
    }

    // Project type scoring (0-15 points)
    switch (contactData.projectType) {
      case 'AI Marketplace Platform':
        score += 15;
        break;
      case 'AI Integration / Bot':
        score += 12;
        break;
      case 'Admin Dashboard':
        score += 8;
        break;
      case 'White-Label Platform':
        score += 8;
        break;
      case 'Mobile App':
        score += 6;
        break;
      default:
        score += 5;
        break;
    }

    // Determine category
    let category = 'UNFIT';
    if (score >= 80) category = 'HOT';
    else if (score >= 50) category = 'WARM';
    else if (score >= 20) category = 'COLD';

    return { score, category };
  }

  // Workflow 1: Lead Capture to CRM
  async leadCaptureToCRM(contactData) {
    try {
      const { score, category } = this.calculateLeadScore(contactData);

      // Create contact submission with scoring
      const contact = new ContactSubmission({
        ...contactData,
        leadScore: score,
        leadCategory: category,
        leadPriority: score >= 80 ? 'HOT' : score >= 50 ? 'WARM' : 'COLD',
        status: 'new',
        createdAt: new Date()
      });

      await contact.save();

      // Send Slack notification (placeholder - would integrate with actual Slack API)
      console.log(`🚨 New ${category} lead: ${contactData.name} (${contactData.email}) - Score: ${score}/100`);

      // Trigger next workflow
      await this.automatedEmailResponses(contact);

      return { success: true, leadScore: score, category };
    } catch (error) {
      console.error('Lead capture workflow error:', error);
      throw error;
    }
  }

  // Workflow 2: Automated Email Responses
  async automatedEmailResponses(contact) {
    try {
      const templateData = {
        name: contact.name,
        email: contact.email,
        company: contact.company,
        projectType: contact.projectType,
        leadScore: contact.leadScore,
        category: contact.leadCategory
      };

      switch (contact.leadCategory) {
        case 'HOT':
          await emailService.sendHotLeadResponse(templateData);
          // Send calendar link for immediate scheduling
          console.log(`📅 HOT lead - Calendar link sent to ${contact.email}`);
          break;

        case 'WARM':
          await emailService.sendWarmLeadResponse(templateData);
          console.log(`📋 WARM lead - Proposal preparation initiated for ${contact.email}`);
          break;

        case 'COLD':
          await emailService.sendColdLeadNurture(templateData);
          // Start nurture sequence
          this.scheduleNurtureSequence(contact);
          break;

        default:
          await emailService.sendColdLeadNurture(templateData);
          break;
      }

      // Send admin notification
      await emailService.sendAdminNotification(contact);

    } catch (error) {
      console.error('Email response workflow error:', error);
      throw error;
    }
  }

  // Workflow 3: Weekly Project Status Updates
  async weeklyProjectStatus() {
    try {
      // Get all active projects
      const activeProjects = await Project.find({ status: 'active' })
        .populate('clientId', 'name email')
        .populate('milestones');

      for (const project of activeProjects) {
        const client = project.clientId;
        if (!client) continue;

        // Generate status summary (placeholder - would use AI for real generation)
        const statusSummary = this.generateWeeklyStatus(project);

        // Send status email
        await emailService.sendWeeklyStatusUpdate({
          clientName: client.name,
          clientEmail: client.email,
          projectName: project.name,
          statusSummary
        });

        console.log(`📧 Weekly status sent to ${client.email} for project ${project.name}`);
      }

    } catch (error) {
      console.error('Weekly status workflow error:', error);
      throw error;
    }
  }

  // Workflow 4: Content Publishing Automation
  async contentPublishing(contentData) {
    try {
      // Generate OG image (placeholder - would call actual OG image service)
      const ogImageUrl = await this.generateOGImage(contentData);

      // Post to LinkedIn (placeholder - would use LinkedIn API)
      await this.postToLinkedIn(contentData, ogImageUrl);

      // Send newsletter (placeholder - would use email service)
      await emailService.sendNewsletter(contentData);

      console.log(`🚀 Content published: ${contentData.title}`);

    } catch (error) {
      console.error('Content publishing workflow error:', error);
      throw error;
    }
  }

  // Workflow 5: Invoice Automation
  async invoiceAutomation(milestoneData) {
    try {
      const invoiceData = this.generateInvoice(milestoneData);

      // Store invoice in database (placeholder)
      console.log(`📄 Invoice generated: ${invoiceData.invoiceNumber}`);

      // Send invoice email
      await emailService.sendInvoice(invoiceData);

      // Schedule payment reminders
      this.schedulePaymentReminders(invoiceData);

    } catch (error) {
      console.error('Invoice automation workflow error:', error);
      throw error;
    }
  }

  // Helper methods
  scheduleNurtureSequence(contact) {
    // Schedule nurture emails (placeholder - would use job scheduler)
    const nurtureEmails = [
      { delay: 3, template: 'nurture_1' },
      { delay: 7, template: 'nurture_2' },
      { delay: 14, template: 'nurture_3' }
    ];

    nurtureEmails.forEach(email => {
      setTimeout(() => {
        emailService.sendNurtureEmail(contact, email.template);
      }, email.delay * 24 * 60 * 60 * 1000); // Convert days to milliseconds
    });
  }

  generateWeeklyStatus(project) {
    // Placeholder status generation - would use AI in production
    return {
      completed: 'UI/UX design finalization',
      inProgress: 'Backend API development',
      blockers: 'Waiting for client feedback on wireframes',
      nextWeek: 'Frontend development, database setup',
      progress: 65,
      timeline: 'On track'
    };
  }

  async generateOGImage(contentData) {
    // Placeholder - would call Vercel OG or similar service
    return `https://og-image-tekvoro.vercel.app/api/generate?title=${encodeURIComponent(contentData.title)}`;
  }

  async postToLinkedIn(contentData, ogImageUrl) {
    // Placeholder - would use LinkedIn API
    console.log(`📘 Posted to LinkedIn: ${contentData.title}`);
  }

  generateInvoice(milestoneData) {
    const invoiceNumber = `TKVR-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`;
    const baseAmount = milestoneData.amount;
    const gstRate = milestoneData.clientState === 'Telangana' ? 0.09 : 0.18;
    const gstAmount = baseAmount * gstRate;
    const totalAmount = baseAmount + gstAmount;

    return {
      invoiceNumber,
      clientName: milestoneData.clientName,
      clientEmail: milestoneData.clientEmail,
      amount: totalAmount,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      items: [milestoneData]
    };
  }

  schedulePaymentReminders(invoiceData) {
    // Schedule reminders (placeholder - would use job scheduler)
    const reminders = [
      { delay: 3, type: 'gentle' },
      { delay: 7, type: 'follow_up' },
      { delay: 14, type: 'urgent' }
    ];

    reminders.forEach(reminder => {
      setTimeout(() => {
        emailService.sendPaymentReminder(invoiceData, reminder.type);
      }, reminder.delay * 24 * 60 * 60 * 1000);
    });
  }

  // Main workflow trigger method
  async triggerWorkflow(workflowName, data) {
    if (this.workflows[workflowName]) {
      return await this.workflows[workflowName](data);
    } else {
      throw new Error(`Workflow ${workflowName} not found`);
    }
  }
}

module.exports = new AutomationService();
