const sgMail = require('@sendgrid/mail');

// Configure SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Email templates and sending service
class EmailService {
  constructor() {
    this.fromEmail = process.env.EMAIL_FROM_ADDRESS || 'info@tekvoro.com';
    this.replyToEmail = process.env.EMAIL_REPLY_TO || this.fromEmail;
  }

  // Send email with SendGrid
  async sendEmail(to, subject, html, options = {}) {
    try {
      const msg = {
        to,
        from: this.fromEmail,
        subject,
        html,
        replyTo: this.replyToEmail,
        ...options
      };

      const result = await sgMail.send(msg);
      console.log(`Email sent successfully to ${to}`);
      return { success: true, messageId: result[0]?.headers?.['x-message-id'] };
    } catch (error) {
      console.error('SendGrid send error:', error);
      throw new Error('Failed to send email');
    }
  }

  // Contact form notification
  async sendContactNotification(contactData) {
    const subject = `New ${contactData.type} inquiry from ${contactData.name}`;
    const html = this.generateContactNotificationHTML(contactData);

    return await this.sendEmail(this.fromEmail, subject, html, {
      replyTo: contactData.email
    });
  }

  // Demo booking notification
  async sendDemoNotification(demoData) {
    const subject = `Demo Request from ${demoData.name}`;
    const html = this.generateDemoNotificationHTML(demoData);

    return await this.sendEmail(this.fromEmail, subject, html, {
      replyTo: demoData.email
    });
  }

  // Welcome email for new subscribers
  async sendWelcomeEmail(subscriberData) {
    const subject = 'Welcome to Tekvoro Technologies - India\'s AI Platform Studio';
    const html = this.generateWelcomeEmailHTML(subscriberData);

    return await this.sendEmail(subscriberData.email, subject, html);
  }

  // Newsletter/Campaign email
  async sendNewsletterEmail(subscriberEmail, campaignData, subscriberName = 'there') {
    const subject = campaignData.subject;
    const html = this.generateNewsletterHTML(campaignData, subscriberName);

    return await this.sendEmail(subscriberEmail, subject, html);
  }

  // Email verification
  async sendVerificationEmail(email, verificationToken) {
    const subject = 'Verify your email - Tekvoro Technologies';
    const html = this.generateVerificationEmailHTML(verificationToken);

    return await this.sendEmail(email, subject, html);
  }

  // Password reset email
  async sendPasswordResetEmail(email, resetToken) {
    const subject = 'Reset your password - Tekvoro Technologies';
    const html = this.generatePasswordResetHTML(resetToken);

    return await this.sendEmail(email, subject, html);
  }

  // HOT lead response email
  async sendHotLeadResponse(leadData) {
    const subject = '🚀 Your Project Matches Our Expertise - Let\'s Schedule a Call';
    const html = this.generateHotLeadResponseHTML(leadData);

    return await this.sendEmail(leadData.email, subject, html);
  }

  // WARM lead response email
  async sendWarmLeadResponse(leadData) {
    const subject = '📋 Your Project Details - Next Steps from Tekvoro';
    const html = this.generateWarmLeadResponseHTML(leadData);

    return await this.sendEmail(leadData.email, subject, html);
  }

  // COLD lead nurture email
  async sendColdLeadNurture(leadData) {
    const subject = '💡 AI Platform Development Resources from Tekvoro';
    const html = this.generateColdLeadNurtureHTML(leadData);

    return await this.sendEmail(leadData.email, subject, html);
  }

  // Admin lead notification
  async sendAdminLeadNotification(leadData) {
    const subject = `New ${leadData.priority} Lead: ${leadData.leadName} from ${leadData.leadCompany}`;
    const html = this.generateAdminLeadNotificationHTML(leadData);

    return await this.sendEmail(process.env.ADMIN_EMAIL || 'tekvoro@gmail.com', subject, html, {
      replyTo: leadData.leadEmail
    });
  }

  // Enhanced sendEmail method with template support
  async sendEmail({ to, subject, template, templateData, ...options }) {
    let html;

    if (template) {
      // Use template-based HTML generation
      switch (template) {
        case 'hot-lead-response':
          html = this.generateHotLeadResponseHTML(templateData);
          break;
        case 'warm-lead-response':
          html = this.generateWarmLeadResponseHTML(templateData);
          break;
        case 'cold-lead-nurture':
          html = this.generateColdLeadNurtureHTML(templateData);
          break;
        case 'admin-lead-notification':
          html = this.generateAdminLeadNotificationHTML(templateData);
          break;
        case 'contact-acknowledgment':
          html = this.generateContactAcknowledgmentHTML(templateData);
          break;
        case 'welcome':
          html = this.generateWelcomeEmailHTML(templateData);
          break;
        default:
          throw new Error(`Unknown email template: ${template}`);
      }
    } else {
      html = options.html;
    }

    const msg = {
      to,
      from: this.fromEmail,
      subject,
      html,
      replyTo: this.replyToEmail,
      ...options
    };

    try {
      // Skip actual email sending in test environment
      if (process.env.NODE_ENV === 'test' || !process.env.SENDGRID_API_KEY) {
        console.log(`[TEST MODE] Would send email to ${to} with subject: "${subject}"`);
        return { success: true, messageId: 'test-message-id' };
      }

      const result = await sgMail.send(msg);
      console.log(`Email sent successfully to ${to}`);
      return { success: true, messageId: result[0]?.headers?.['x-message-id'] };
    } catch (error) {
      console.error('SendGrid send error:', error);
      throw new Error('Failed to send email');
    }
  }
  generateContactNotificationHTML(data) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FFD600;">New ${data.type} Inquiry</h2>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #FFD600;">
            ${data.message.replace(/\n/g, '<br>')}
          </div>
          <p><strong>Type:</strong> ${data.type}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          This message was sent from the Tekvoro Technologies website contact form.
        </p>
      </div>
    `;
  }

  generateDemoNotificationHTML(data) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FFD600;">New Demo Request</h2>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
          <p><strong>Project Type:</strong> ${data.projectType}</p>
          <p><strong>Timeline:</strong> ${data.timeline || 'Not specified'}</p>
          ${data.message ? `<p><strong>Message:</strong></p><div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #FFD600;">${data.message.replace(/\n/g, '<br>')}</div>` : ''}
          <p><strong>Source:</strong> Website Demo Form</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          This demo request was submitted from the Tekvoro Technologies website.
        </p>
      </div>
    `;
  }

  generateWelcomeEmailHTML(data) {
    const verificationUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/verify-email/${data.verificationToken}`;

    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
        <div style="background: white; padding: 30px; border-radius: 10px; text-align: center;">
          <h1 style="color: #FFD600; margin-bottom: 20px;">Welcome to Tekvoro!</h1>
          <p style="font-size: 18px; color: #333; margin-bottom: 20px;">
            Thank you for subscribing to our newsletter. You're now part of India's AI Platform Studio community.
          </p>

          <div style="background: #f0f0f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 10px;">What you'll receive:</h3>
            <ul style="text-align: left; color: #555;">
              <li>AI platform development insights</li>
              <li>Case studies from our 90-day delivery projects</li>
              <li>Industry trends and technology updates</li>
              <li>Exclusive invites to webinars and events</li>
            </ul>
          </div>

          <p style="color: #666; font-size: 14px; margin: 20px 0;">
            Before we can start sending you updates, please verify your email address:
          </p>

          <a href="${verificationUrl}"
             style="background: #FFD600; color: black; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
            Verify Your Email
          </a>

          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${verificationUrl}" style="color: #FFD600;">${verificationUrl}</a>
          </p>

          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            Best regards,<br>
            <strong>The Tekvoro Team</strong><br>
            India's AI Platform Studio — From Idea to Live in 90 Days
          </p>
        </div>
      </div>
    `;
  }

  generateNewsletterHTML(campaign, subscriberName) {
    // Personalize content
    let content = campaign.content
      .replace(/\{\{name\}\}/g, subscriberName)
      .replace(/\{\{email\}\}/g, campaign.to || '');

    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
        <div style="background: white; padding: 30px; border-radius: 10px;">
          ${content}

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

          <p style="color: #666; font-size: 14px; text-align: center;">
            You're receiving this because you subscribed to updates from Tekvoro Technologies.<br>
            <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/unsubscribe" style="color: #FFD600;">Unsubscribe</a> |
            <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/privacy" style="color: #666;">Privacy Policy</a>
          </p>

          <p style="color: #999; font-size: 12px; text-align: center; margin-top: 20px;">
            <strong>Tekvoro Technologies</strong><br>
            India's AI Platform Studio — From Idea to Live in 90 Days<br>
            Hyderabad, Telangana, India
          </p>
        </div>
      </div>
    `;
  }

  generateVerificationEmailHTML(token) {
    const verificationUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/verify-email/${token}`;

    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
        <div style="background: white; padding: 30px; border-radius: 10px; text-align: center;">
          <h1 style="color: #FFD600; margin-bottom: 20px;">Verify Your Email</h1>
          <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
            Welcome to Tekvoro Technologies! Please verify your email address to complete your subscription.
          </p>

          <a href="${verificationUrl}"
             style="background: #FFD600; color: black; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold; margin: 20px 0;">
            Verify Email Address
          </a>

          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${verificationUrl}" style="color: #FFD600;">${verificationUrl}</a>
          </p>

          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            Best regards,<br>
            <strong>The Tekvoro Team</strong>
          </p>
        </div>
      </div>
    `;
  }

  generatePasswordResetHTML(token) {
    const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password/${token}`;

    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
        <div style="background: white; padding: 30px; border-radius: 10px; text-align: center;">
          <h1 style="color: #FFD600; margin-bottom: 20px;">Reset Your Password</h1>
          <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
            We received a request to reset your password. Click the button below to create a new password.
          </p>

          <a href="${resetUrl}"
             style="background: #FFD600; color: black; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold; margin: 20px 0;">
            Reset Password
          </a>

          <p style="color: #666; font-size: 14px; margin: 20px 0;">
            This link will expire in 1 hour for security reasons.
          </p>

          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            If you didn't request a password reset, please ignore this email.<br>
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${resetUrl}" style="color: #FFD600;">${resetUrl}</a>
          </p>

          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            Best regards,<br>
            <strong>The Tekvoro Team</strong>
          </p>
        </div>
      </div>
    `;
  }

  generateHotLeadResponseHTML(data) {
    const calendarUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/book-call`;

    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
        <div style="background: white; padding: 30px; border-radius: 10px;">
          <h1 style="color: #FFD600; margin-bottom: 20px; text-align: center;">🚀 Your Project Matches Our Expertise!</h1>

          <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
            Hi ${data.name},
          </p>

          <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
            Thank you for reaching out to Tekvoro Technologies. We've reviewed your ${data.projectType} project details, and we're excited to discuss how we can help you bring it to life.
          </p>

          <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; border-left: 4px solid #FFD600; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #333;">Your Project Summary:</h3>
            <p style="margin: 5px 0;"><strong>Type:</strong> ${data.projectType}</p>
            <p style="margin: 5px 0;"><strong>Budget:</strong> ${data.budget}</p>
            <p style="margin: 5px 0;"><strong>Timeline:</strong> ${data.timeline}</p>
            <p style="margin: 5px 0;"><strong>Company:</strong> ${data.company}</p>
          </div>

          <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
            Based on your requirements, we believe we can deliver exactly what you're looking for. As India's AI Platform Studio, we've built similar platforms including our flagship QuickMela marketplace with AI fraud detection.
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${calendarUrl}"
               style="background: #FFD600; color: black; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold; font-size: 16px;">
              Schedule Your Discovery Call
            </a>
          </div>

          <p style="font-size: 14px; color: #666; margin-bottom: 20px;">
            During our 20-minute call, we'll discuss your project requirements, share relevant case studies, and outline a potential approach and timeline. No sales pitch, just helpful insights.
          </p>

          <p style="font-size: 16px; color: #333;">
            Looking forward to speaking with you!<br>
            <strong>The Tekvoro Team</strong><br>
            India's AI Platform Studio — From Idea to Live in 90 Days
          </p>

          <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 20px;">
            <p style="color: #999; font-size: 12px;">
              <strong>Direct Contact:</strong> +91 9121331813 | tekvoro@gmail.com<br>
              <strong>Address:</strong> 5-24-190, NTR Nagar, Gajularamaram, Hyderabad, Telangana – 500055
            </p>
          </div>
        </div>
      </div>
    `;
  }

  generateWarmLeadResponseHTML(data) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
        <div style="background: white; padding: 30px; border-radius: 10px;">
          <h1 style="color: #FFD600; margin-bottom: 20px; text-align: center;">📋 Your Project Details - Next Steps</h1>

          <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
            Hi ${data.name},
          </p>

          <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
            Thank you for sharing details about your ${data.projectType} project. We've received your inquiry and wanted to acknowledge we've seen it and are reviewing your requirements.
          </p>

          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; border-left: 4px solid #FFD600; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #333;">What We Noted:</h3>
            <p style="margin: 5px 0;"><strong>Project:</strong> ${data.projectType}</p>
            <p style="margin: 5px 0;"><strong>Budget Range:</strong> ${data.budget}</p>
            <p style="margin: 5px 0;"><strong>Timeline:</strong> ${data.timeline}</p>
            <p style="margin: 5px 0;"><strong>Found us via:</strong> ${data.source}</p>
          </div>

          <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
            We'll prepare a tailored proposal for your ${data.projectType} project within the next 2-4 hours. In the meantime, you might find our QuickMela case study relevant to your needs.
          </p>

          <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #333;">💡 QuickMela Success Story</h3>
            <p style="margin: 0; font-size: 14px; color: #666;">
              We built a complete AI-powered auction marketplace with fraud detection, real-time bidding, and WhatsApp integration in just 90 days. Similar scope to what you're looking for.
            </p>
            <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/case-studies/quickmela"
               style="color: #FFD600; text-decoration: none; font-weight: bold; display: inline-block; margin-top: 10px;">
              Read the full case study →
            </a>
          </div>

          <p style="font-size: 16px; color: #333;">
            We'll be in touch soon with a detailed proposal.<br>
            <strong>The Tekvoro Team</strong><br>
            India's AI Platform Studio — From Idea to Live in 90 Days
          </p>
        </div>
      </div>
    `;
  }

  generateColdLeadNurtureHTML(data) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
        <div style="background: white; padding: 30px; border-radius: 10px;">
          <h1 style="color: #FFD600; margin-bottom: 20px; text-align: center;">💡 AI Platform Development Resources</h1>

          <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
            Hi ${data.name},
          </p>

          <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
            Thank you for your interest in ${data.projectType} development. While we're currently focusing on projects that match our AI platform expertise, we thought you might find these resources helpful for your project planning.
          </p>

          <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 15px 0; color: #333;">📚 Free Resources for Your Project:</h3>
            <ul style="margin: 0; padding-left: 20px; color: #333;">
              <li style="margin-bottom: 8px;"><strong>Platform Development Checklist</strong> - 25 critical items for successful launches</li>
              <li style="margin-bottom: 8px;"><strong>AI Integration Guide</strong> - When and how to add AI features</li>
              <li style="margin-bottom: 8px;"><strong>Cost Optimization Strategies</strong> - Reduce development costs by 30%</li>
              <li style="margin-bottom: 8px;"><strong>Timeline Planning Template</strong> - Realistic project schedules</li>
            </ul>
            <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/resources"
               style="color: #FFD600; text-decoration: none; font-weight: bold; display: inline-block; margin-top: 15px;">
              Download Free Resources →
            </a>
          </div>

          <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #856404;">🎯 Our Expertise</h3>
            <p style="margin: 0; font-size: 14px; color: #856404;">
              We specialize in AI-powered marketplaces, platforms, and SaaS products. If your ${data.projectType} involves AI features, real-time systems, or complex integrations, we'd love to explore if we can help.
            </p>
          </div>

          <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
            If you'd like to discuss your project further or need help with any of these resources, feel free to reply to this email.
          </p>

          <p style="font-size: 16px; color: #333;">
            Best regards,<br>
            <strong>The Tekvoro Team</strong><br>
            India's AI Platform Studio — From Idea to Live in 90 Days
          </p>

          <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 20px;">
            <p style="color: #999; font-size: 12px; text-align: center;">
              <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/unsubscribe" style="color: #666;">Unsubscribe</a> |
              <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/contact" style="color: #666;">Contact Us</a>
            </p>
          </div>
        </div>
      </div>
    `;
  }

  // Admin lead notification
  async sendAdminNotification(leadData) {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@tekvoro.com';
    const subject = `🚨 New ${leadData.leadPriority} Lead: ${leadData.name} - ${leadData.projectType}`;
    const html = this.generateAdminLeadNotificationHTML(leadData);

    return await this.sendEmail(adminEmail, subject, html);
  }

  generateAdminLeadNotificationHTML(data) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #f9f9f9; padding: 20px;">
          <div style="background: white; padding: 30px; border-radius: 10px;">
            <h1 style="color: ${data.priority === 'HOT' ? '#ff4444' : data.priority === 'WARM' ? '#ff8800' : '#666'}; margin-bottom: 20px;">
              🚨 New ${data.priority} Lead Alert
            </h1>

            <div style="background: ${data.priority === 'HOT' ? '#ffeaea' : data.priority === 'WARM' ? '#fff3e0' : '#f5f5f5'}; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="margin: 0 0 15px 0; color: #333;">Lead Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 5px 0; font-weight: bold;">Name:</td><td style="padding: 5px 0;">${data.leadName}</td></tr>
                <tr><td style="padding: 5px 0; font-weight: bold;">Email:</td><td style="padding: 5px 0;"><a href="mailto:${data.leadEmail}" style="color: #FFD600;">${data.leadEmail}</a></td></tr>
                <tr><td style="padding: 5px 0; font-weight: bold;">Company:</td><td style="padding: 5px 0;">${data.leadCompany}</td></tr>
                <tr><td style="padding: 5px 0; font-weight: bold;">Phone:</td><td style="padding: 5px 0;"><a href="tel:${data.leadPhone}" style="color: #FFD600;">${data.leadPhone}</a></td></tr>
                <tr><td style="padding: 5px 0; font-weight: bold;">Project Type:</td><td style="padding: 5px 0;">${data.projectType}</td></tr>
                <tr><td style="padding: 5px 0; font-weight: bold;">Budget:</td><td style="padding: 5px 0;">${data.budget}</td></tr>
                <tr><td style="padding: 5px 0; font-weight: bold;">Timeline:</td><td style="padding: 5px 0;">${data.timeline}</td></tr>
                <tr><td style="padding: 5px 0; font-weight: bold;">Source:</td><td style="padding: 5px 0;">${data.source}</td></tr>
                <tr><td style="padding: 5px 0; font-weight: bold;">Lead Score:</td><td style="padding: 5px 0; font-weight: bold; color: ${data.leadScore >= 80 ? '#ff4444' : data.leadScore >= 50 ? '#ff8800' : '#666'};">${data.leadScore}/100 (${data.leadCategory})</td></tr>
              </table>
            </div>

            <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin: 0 0 10px 0; color: #333;">Project Description:</h3>
              <p style="margin: 0; color: #333; white-space: pre-line;">${data.description}</p>
            </div>

            ${data.message ? `
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin: 0 0 10px 0; color: #333;">Additional Message:</h3>
              <p style="margin: 0; color: #333; white-space: pre-line;">${data.message}</p>
            </div>
            ` : ''}

            <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin: 0 0 10px 0; color: #333;">Recommended Actions:</h3>
              <ul style="margin: 0; padding-left: 20px; color: #333;">
                ${data.priority === 'HOT' ? `
                  <li><strong>URGENT:</strong> Respond within 1 hour</li>
                  <li>Send calendar booking link immediately</li>
                  <li>Call founder: +91 9121331813</li>
                  <li>Prepare QuickMela case study</li>
                ` : data.priority === 'WARM' ? `
                  <li>Respond within 4 hours</li>
                  <li>Prepare tailored proposal</li>
                  <li>Send relevant case studies</li>
                  <li>Schedule discovery call</li>
                ` : `
                  <li>Respond within 24 hours</li>
                  <li>Send nurture sequence emails</li>
                  <li>Add to long-term follow-up</li>
                `}
              </ul>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="mailto:${data.leadEmail}?subject=Re: Your ${data.projectType} Project Inquiry"
                 style="background: #FFD600; color: black; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold; margin: 0 10px;">
                Reply to Lead
              </a>
              <a href="tel:${data.leadPhone}"
                 style="background: #4CAF50; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold; margin: 0 10px;">
                Call Now
              </a>
            </div>

            <p style="color: #666; font-size: 14px; margin-top: 20px;">
              Submitted: ${new Date(data.submittedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}<br>
              IP: ${data.ipAddress || 'N/A'} | User-Agent: ${data.userAgent ? data.userAgent.substring(0, 50) + '...' : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    `;
  }
}

module.exports = new EmailService();
