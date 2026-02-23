const n8nWorkflows = {
  // Workflow 1: Lead Capture → CRM
  leadCaptureToCRM: {
    name: "Lead Capture to CRM",
    description: "Automatically capture leads from website forms and add to CRM with scoring",
    nodes: [
      {
        id: "webhook",
        type: "n8n-nodes-base.webhook",
        parameters: {
          httpMethod: "POST",
          path: "lead-capture",
          responseMode: "responseNode",
          options: {}
        },
        position: [100, 100]
      },
      {
        id: "leadScoring",
        type: "n8n-nodes-base.function",
        parameters: {
          functionCode: `
            // Lead scoring algorithm from automation master
            const budget = $node.webhook.json.body.budget;
            const timeline = $node.webhook.json.body.timeline;
            const source = $node.webhook.json.body.how_found_us;
            const projectType = $node.webhook.json.body.project_type;

            let score = 0;

            // Budget scoring
            switch(budget) {
              case "₹20L+": score += 40; break;
              case "₹8-20L": score += 30; break;
              case "₹3-8L": score += 20; break;
              case "Under ₹3L": score += 5; break;
            }

            // Timeline scoring
            switch(timeline) {
              case "ASAP (< 1 month)": score += 25; break;
              case "1-3 months": score += 20; break;
              case "3-6 months": score += 10; break;
            }

            // Source scoring
            switch(source) {
              case "Referral": score += 20; break;
              case "Clutch": score += 15; break;
              case "LinkedIn": score += 10; break;
              case "Google": score += 8; break;
            }

            // Project type scoring
            switch(projectType) {
              case "AI Marketplace Platform": score += 15; break;
              case "AI Integration / Bot": score += 12; break;
              case "White-Label Platform": score += 8; break;
            }

            let category = "UNFIT";
            if (score >= 80) category = "HOT";
            else if (score >= 50) category = "WARM";
            else if (score >= 20) category = "COLD";

            return {
              json: {
                ...$node.webhook.json.body,
                leadScore: score,
                leadCategory: category,
                priority: score >= 80 ? "URGENT" : score >= 50 ? "HIGH" : "NORMAL"
              }
            };
          `
        },
        position: [400, 100]
      },
      {
        id: "crmStorage",
        type: "n8n-nodes-base.supabase",
        parameters: {
          operation: "insert",
          table: "contacts",
          columns: "name,email,company,project_type,budget,timeline,lead_score,lead_category,priority,status"
        },
        position: [700, 100]
      },
      {
        id: "slackNotification",
        type: "n8n-nodes-base.slack",
        parameters: {
          resource: "message",
          operation: "post",
          channels: "#leads",
          text: "New {{ $node.leadScoring.json.body.leadCategory }} lead: {{ $node.webhook.json.body.name }} from {{ $node.webhook.json.body.company }} - Score: {{ $node.leadScoring.json.body.leadScore }}"
        },
        position: [1000, 100]
      }
    ],
    connections: {
      "webhook": {
        main: [
          {
            node: "leadScoring",
            type: "main",
            index: 0
          }
        ]
      },
      "leadScoring": {
        main: [
          {
            node: "crmStorage",
            type: "main",
            index: 0
          }
        ]
      },
      "crmStorage": {
        main: [
          {
            node: "slackNotification",
            type: "main",
            index: 0
          }
        ]
      }
    }
  },

  // Workflow 2: Automated Email Responses
  automatedEmailResponses: {
    name: "Automated Lead Email Responses",
    description: "Send personalized email responses based on lead scoring",
    nodes: [
      {
        id: "leadTrigger",
        type: "n8n-nodes-base.supabase",
        parameters: {
          operation: "trigger",
          table: "contacts",
          event: "INSERT"
        },
        position: [100, 100]
      },
      {
        id: "categoryRouter",
        type: "n8n-nodes-base.switch",
        parameters: {
          routing: "rule",
          rules: {
            rule1: {
              conditions: [
                {
                  leftValue: "{{ $node.leadTrigger.json.body.lead_category }}",
                  rightValue: "HOT"
                }
              ]
            },
            rule2: {
              conditions: [
                {
                  leftValue: "{{ $node.leadTrigger.json.body.lead_category }}",
                  rightValue: "WARM"
                }
              ]
            }
          }
        },
        position: [400, 100]
      },
      {
        id: "hotLeadEmail",
        type: "n8n-nodes-base.resend",
        parameters: {
          operation: "send",
          to: "{{ $node.leadTrigger.json.body.email }}",
          subject: "Let's Schedule Your Discovery Call - Tekvoro",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Hi {{ $node.leadTrigger.json.body.name }},</h2>
              <p>Thank you for your interest in working with Tekvoro!</p>
              <p>Based on your requirements for {{ $node.leadTrigger.json.body.project_type }}, I'd love to schedule a 20-minute discovery call to understand your vision better.</p>
              <p><strong>Your lead score: {{ $node.leadTrigger.json.body.lead_score }}/100</strong></p>
              <a href="https://cal.com/tekvoro/discovery" style="background: #F5C542; color: black; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Schedule Discovery Call</a>
              <p>Best regards,<br>Sanieev Musugu<br>Founder, Tekvoro Technologies</p>
            </div>
          `
        },
        position: [700, 50]
      },
      {
        id: "warmLeadEmail",
        type: "n8n-nodes-base.resend",
        parameters: {
          operation: "send",
          to: "{{ $node.leadTrigger.json.body.email }}",
          subject: "Your Project Proposal Timeline - Tekvoro",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Hi {{ $node.leadTrigger.json.body.name }},</h2>
              <p>Thank you for reaching out about your {{ $node.leadTrigger.json.body.project_type }} project!</p>
              <p>We'll prepare a detailed proposal within 4 hours and send it over for your review.</p>
              <p><strong>Lead score: {{ $node.leadTrigger.json.body.lead_score }}/100</strong></p>
              <p>Looking forward to working together!</p>
              <p>Best,<br>Sanieev Musugu<br>Founder, Tekvoro Technologies</p>
            </div>
          `
        },
        position: [700, 150]
      }
    ],
    connections: {
      "leadTrigger": {
        main: [
          {
            node: "categoryRouter",
            type: "main",
            index: 0
          }
        ]
      },
      "categoryRouter": {
        main: [
          {
            node: "hotLeadEmail",
            type: "main",
            index: 0
          },
          {
            node: "warmLeadEmail",
            type: "main",
            index: 1
          }
        ]
      }
    }
  },

  // Workflow 3: Weekly Project Status Updates
  weeklyProjectStatus: {
    name: "Weekly Project Status Updates",
    description: "Automatically generate and send weekly project status emails to clients",
    nodes: [
      {
        id: "weeklyTrigger",
        type: "n8n-nodes-base.scheduleTrigger",
        parameters: {
          rule: {
            interval: [
              {
                type: "weeks",
                value: 1
              }
            ],
            schedule: {
              dayOfWeek: "friday",
              hour: 10
            }
          }
        },
        position: [100, 100]
      },
      {
        id: "activeProjects",
        type: "n8n-nodes-base.supabase",
        parameters: {
          operation: "select",
          table: "projects",
          conditions: "status = 'active'"
        },
        position: [400, 100]
      },
      {
        id: "generateStatus",
        type: "n8n-nodes-base.openAi",
        parameters: {
          model: "gpt-4",
          prompt: `
            Generate a weekly project status email for:
            Client: {{ $node.activeProjects.json.body.client_name }}
            Project: {{ $node.activeProjects.json.body.name }}
            Week: Current week

            Use this data:
            - Completed this week: [Pull from project tasks completed]
            - In progress: [Current sprint tasks]
            - Blockers: [Any blockers identified]
            - Next week plan: [Upcoming tasks]
            - % complete overall: [Calculate from milestones]

            Tone: Professional, confident, transparent.
            Format: Short paragraphs, actionable.
            End with: One specific question or action item for the client.
          `
        },
        position: [700, 100]
      },
      {
        id: "sendStatusEmail",
        type: "n8n-nodes-base.resend",
        parameters: {
          operation: "send",
          to: "{{ $node.activeProjects.json.body.client_email }}",
          subject: "Weekly Project Update - {{ $node.activeProjects.json.body.name }}",
          html: "{{ $node.generateStatus.json.body.generated_email }}"
        },
        position: [1000, 100]
      }
    ],
    connections: {
      "weeklyTrigger": {
        main: [
          {
            node: "activeProjects",
            type: "main",
            index: 0
          }
        ]
      },
      "activeProjects": {
        main: [
          {
            node: "generateStatus",
            type: "main",
            index: 0
          }
        ]
      },
      "generateStatus": {
        main: [
          {
            node: "sendStatusEmail",
            type: "main",
            index: 0
          }
        ]
      }
    }
  },

  // Workflow 4: Content Publishing Automation
  contentPublishing: {
    name: "Content Publishing Automation",
    description: "Automate blog post publishing across all channels",
    nodes: [
      {
        id: "cmsTrigger",
        type: "n8n-nodes-base.supabase",
        parameters: {
          operation: "trigger",
          table: "blog_posts",
          event: "INSERT"
        },
        position: [100, 100]
      },
      {
        id: "generateOGImage",
        type: "n8n-nodes-base.httpRequest",
        parameters: {
          method: "POST",
          url: "https://og-image-tekvoro.vercel.app/api/generate",
          body: {
            title: "{{ $node.cmsTrigger.json.body.title }}",
            description: "{{ $node.cmsTrigger.json.body.excerpt }}"
          }
        },
        position: [400, 100]
      },
      {
        id: "linkedinPost",
        type: "n8n-nodes-base.linkedin",
        parameters: {
          operation: "post",
          text: `🚀 New article: {{ $node.cmsTrigger.json.body.title }}

{{ $node.cmsTrigger.json.body.excerpt }}

Read full article: https://tekvoro.com/blog/{{ $node.cmsTrigger.json.body.slug }}

#AI #Tech #SoftwareDevelopment #Tekvoro`,
          visibility: "PUBLIC"
        },
        position: [700, 100]
      },
      {
        id: "emailNewsletter",
        type: "n8n-nodes-base.resend",
        parameters: {
          operation: "send",
          to: "{{ newsletter_subscribers }}",
          subject: "{{ $node.cmsTrigger.json.body.title }}",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <img src="{{ $node.generateOGImage.json.body.imageUrl }}" alt="Article OG Image" style="width: 100%; border-radius: 8px;">
              <h2>{{ $node.cmsTrigger.json.body.title }}</h2>
              <p>{{ $node.cmsTrigger.json.body.excerpt }}</p>
              <a href="https://tekvoro.com/blog/{{ $node.cmsTrigger.json.body.slug }}" style="background: #F5C542; color: black; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Read Full Article</a>
            </div>
          `
        },
        position: [1000, 100]
      }
    ],
    connections: {
      "cmsTrigger": {
        main: [
          {
            node: "generateOGImage",
            type: "main",
            index: 0
          }
        ]
      },
      "generateOGImage": {
        main: [
          {
            node: "linkedinPost",
            type: "main",
            index: 0
          }
        ]
      },
      "linkedinPost": {
        main: [
          {
            node: "emailNewsletter",
            type: "main",
            index: 0
          }
        ]
      }
    }
  },

  // Workflow 5: Invoice Automation
  invoiceAutomation: {
    name: "Invoice Generation & Follow-up",
    description: "Automatically generate invoices and send payment reminders",
    nodes: [
      {
        id: "milestoneComplete",
        type: "n8n-nodes-base.supabase",
        parameters: {
          operation: "trigger",
          table: "project_milestones",
          event: "UPDATE",
          conditions: "status = 'completed'"
        },
        position: [100, 100]
      },
      {
        id: "generateInvoice",
        type: "n8n-nodes-base.function",
        parameters: {
          functionCode: `
            const milestone = $node.milestoneComplete.json.body;
            const gstRate = milestone.client_state === 'Telangana' ? 0.09 : 0.18;
            const baseAmount = milestone.amount;
            const gstAmount = baseAmount * gstRate;
            const totalAmount = baseAmount + gstAmount;

            return {
              json: {
                invoice_number: \`TKVR-\${new Date().getFullYear()}-\${Date.now().toString().slice(-4)}\`,
                client_id: milestone.client_id,
                project_id: milestone.project_id,
                milestone_id: milestone.id,
                base_amount: baseAmount,
                gst_amount: gstAmount,
                total_amount: totalAmount,
                due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
              }
            };
          `
        },
        position: [400, 100]
      },
      {
        id: "storeInvoice",
        type: "n8n-nodes-base.supabase",
        parameters: {
          operation: "insert",
          table: "invoices"
        },
        position: [700, 100]
      },
      {
        id: "sendInvoiceEmail",
        type: "n8n-nodes-base.resend",
        parameters: {
          operation: "send",
          attachments: ["invoice_pdf"],
          to: "{{ $node.generateInvoice.json.body.client_email }}",
          subject: "Invoice {{ $node.generateInvoice.json.body.invoice_number }} - Tekvoro",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Invoice for {{ $node.milestoneComplete.json.body.milestone_name }}</h2>
              <p>Dear {{ $node.generateInvoice.json.body.client_name }},</p>
              <p>Your invoice for ₹{{ $node.generateInvoice.json.body.total_amount.toLocaleString('en-IN') }} is ready.</p>
              <a href="{{ invoice_pdf_url }}" style="background: #F5C542; color: black; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Download Invoice</a>
              <a href="{{ razorpay_link }}" style="background: #3395ff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-left: 12px;">Pay Now</a>
            </div>
          `
        },
        position: [1000, 100]
      }
    ],
    connections: {
      "milestoneComplete": {
        main: [
          {
            node: "generateInvoice",
            type: "main",
            index: 0
          }
        ]
      },
      "generateInvoice": {
        main: [
          {
            node: "storeInvoice",
            type: "main",
            index: 0
          }
        ]
      },
      "storeInvoice": {
        main: [
          {
            node: "sendInvoiceEmail",
            type: "main",
            index: 0
          }
        ]
      }
    }
  }
};

module.exports = n8nWorkflows;
