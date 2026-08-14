const p = (text) => ({ type: 'paragraph', data: { text } });
const h = (text, level = 2) => ({ type: 'heading', data: { level, text } });
const list = (items, ordered = false) => ({ type: 'list', data: { ordered, items } });
const callout = (title, text) => ({ type: 'callout', data: { title, text } });
const table = (headers, rows) => ({ type: 'table', data: { headers, rows } });
const links = (title, items) => ({ type: 'links', data: { title, items } });

const path = (category, slug) => `/knowledge/${category}/${slug}`;

function article({
  slug,
  title,
  seoTitle,
  description,
  category = 'guides',
  tags,
  body,
  faqs = [],
  products = [],
  related = [],
  publishedAt,
  featured = false,
  status = 'PUBLISHED',
}) {
  return {
    slug,
    title,
    seoTitle,
    seoDescription: description,
    excerpt: description,
    categorySlug: category,
    coverImageId: null,
    author: 'Surjora Team',
    readTimeMinutes: Math.max(3, Math.ceil(JSON.stringify(body).split(/\s+/).length / 220)),
    tags,
    faqs,
    publishedAt,
    featured,
    status,
    body,
    relatedProductSlugs: products,
    relatedArticleSlugs: related,
  };
}

export const articles = [
  article({
    slug: 'case-study-1688-wholesale-sourcing',
    title: 'Case Study: Sourcing Wholesale Goods on 1688',
    seoTitle: 'Archived 1688 Sourcing Case Study | Surjora',
    description:
      'This record is archived because Surjora does not have sufficient attributable evidence to publish it as a real case study.',
    category: 'case-studies',
    tags: ['1688', 'case study'],
    status: 'ARCHIVED',
    publishedAt: null,
    body: [
      callout(
        'Archived for accuracy',
        'Surjora only publishes case studies supported by real, attributable evidence. This earlier draft did not meet that standard and is not publicly available.',
      ),
    ],
  }),
  article({
    slug: 'china-platform-news-2026-midyear',
    title: 'Chinese Platform News: Mid-Year 2026 Roundup',
    seoTitle: 'Archived Chinese Platform News Roundup | Surjora',
    description:
      'This record is archived because its time-sensitive claims were not supported by sufficient primary sources.',
    category: 'news',
    tags: ['news', '2026'],
    status: 'ARCHIVED',
    publishedAt: null,
    body: [
      callout(
        'Archived for accuracy',
        'Time-sensitive news needs dated, verifiable primary sources. This earlier draft did not meet that standard and is not publicly available.',
      ),
    ],
  }),

  // Priority 1: WeChat pillar cluster. The existing registration and security URLs are preserved.
  article({
    slug: 'wechat-registration-china-guide',
    title: 'How to Register for WeChat: Complete Account Setup Guide',
    seoTitle: 'How to Register for WeChat: Complete Guide',
    description:
      'Learn how WeChat registration works, what you need, why friend or QR verification may appear, and how to avoid common setup problems.',
    tags: ['wechat', 'registration', 'account setup'],
    featured: true,
    publishedAt: '2026-08-01T00:00:00Z',
    products: ['wechat-accounts', 'chinese-phone-numbers', 'wechat-qr-scan'],
    related: [
      'can-foreigners-register-for-wechat',
      'wechat-qr-verification-guide',
      'wechat-registration-failed',
      'wechat-phone-number-requirements',
      'how-to-keep-wechat-account-secure',
    ],
    body: [
      p(
        'You can usually register for WeChat in the official mobile app with a phone number that can receive SMS. The exact checks are risk-based: some people finish with an SMS code, while others are asked for additional security verification, such as help from an eligible existing user. A Chinese number is not universally required.',
      ),
      callout(
        'Key takeaway',
        'Use your own long-term phone number, install the official app, enter accurate details, and be prepared for an additional verification step. Never pay an unknown person or share a login code just to pass registration.',
      ),
      h('What you need before registering'),
      list([
        'The official WeChat app from a trusted app store',
        'A phone number you control and can keep active',
        'Reliable mobile data or Wi-Fi',
        'Your real name and identity information if WeChat requests it',
        'An eligible existing WeChat user only if the app specifically asks for assisted verification',
      ]),
      h('Step-by-step registration process'),
      list(
        [
          'Open WeChat and choose Sign Up with mobile.',
          'Select the correct country or region code and enter your phone number.',
          'Create a strong password and accept the current terms shown in the app.',
          'Complete the security check and enter the SMS code sent to your number.',
          'If assisted verification appears, follow the instructions displayed in your app. Requirements can differ by account and region.',
          'After access is granted, review your profile, linked phone number, privacy settings, and emergency contacts.',
        ],
        true,
      ),
      h('Why WeChat may ask another user to verify you'),
      p(
        'Assisted verification is an anti-abuse measure, not a guaranteed step for every registration. The helper must satisfy the conditions shown in WeChat; account age, recent verification activity, region, and account standing may matter. Surjora cannot override WeChat eligibility rules or guarantee that a particular helper will be accepted.',
      ),
      h('Common mistakes to avoid'),
      list([
        'Requesting many SMS codes in a short period',
        'Switching devices, numbers, networks, or regions repeatedly',
        'Using temporary numbers that you cannot access later',
        'Entering identity details that do not match your documents',
        'Sharing SMS codes, passwords, or screen-control access with strangers',
      ]),
      h('After registration'),
      p(
        'Keep the linked number active, set a unique password, add recovery options available in your account, and avoid unusual bulk activity on a new profile. Payment functions, public accounts, advertising, and other regulated features have separate eligibility and identity requirements; a basic WeChat registration does not automatically unlock them.',
      ),
      links('Continue the WeChat setup journey', [
        {
          label: 'Can foreigners register for WeChat?',
          href: path('faq', 'can-foreigners-register-for-wechat'),
        },
        {
          label: 'WeChat QR verification explained',
          href: path('guides', 'wechat-qr-verification-guide'),
        },
        {
          label: 'Fix a failed WeChat registration',
          href: path('tutorials', 'wechat-registration-failed'),
        },
        {
          label: 'WeChat phone number requirements',
          href: path('faq', 'wechat-phone-number-requirements'),
        },
      ]),
    ],
    faqs: [
      {
        question: 'Do I need a Chinese phone number to register for WeChat?',
        answer:
          'Not always. WeChat supports many international country codes, but availability and additional checks vary by region and risk signals.',
      },
      {
        question: 'Is friend verification required for every new account?',
        answer: 'No. It is a risk-based check that may appear during registration or recovery.',
      },
      {
        question: 'Can I use a temporary SMS number?',
        answer:
          'It is risky because you may need the same number for future login or recovery. A number you control long term is safer.',
      },
    ],
  }),
  article({
    slug: 'can-foreigners-register-for-wechat',
    title: 'Can Foreigners Register for WeChat?',
    seoTitle: 'Can Foreigners Register for WeChat? Requirements',
    description:
      'Yes, many foreigners can register for WeChat. Learn which phone numbers work, when verification appears, and which features may remain restricted.',
    category: 'faq',
    tags: ['wechat', 'foreigners', 'registration'],
    publishedAt: '2026-08-02T00:00:00Z',
    products: ['wechat-accounts', 'wechat-qr-scan'],
    related: [
      'wechat-registration-china-guide',
      'wechat-phone-number-requirements',
      'wechat-qr-verification-guide',
    ],
    body: [
      p(
        'Yes. WeChat is available in many countries, and foreign users can normally attempt registration with a supported international mobile number. Success is not automatic: Tencent may request SMS confirmation, assisted verification, identity checks, or additional review based on the registration context.',
      ),
      h('What is different for users outside mainland China?'),
      table(
        ['Area', 'What to expect', 'Important limitation'],
        [
          [
            'Phone number',
            'Many international codes are supported',
            'Support and delivery vary by carrier and region',
          ],
          [
            'Identity',
            'Basic messaging may not require the same checks as regulated features',
            'Payments and business tools can require separate verification',
          ],
          [
            'Assisted verification',
            'May be requested',
            'The helper must meet the conditions shown in the app',
          ],
          [
            'Data and terms',
            'The app presents terms based on account context',
            'Read the current notices before accepting',
          ],
        ],
      ),
      h('Best practices for a clean registration'),
      list([
        'Use the official mobile app and your real country code',
        'Use a normal mobile number you control rather than a disposable inbox',
        'Avoid VPN or device switching during signup unless your network genuinely requires it',
        'Enter truthful details and follow the exact in-app instructions',
        'Wait before retrying if WeChat applies a temporary limit',
      ]),
      h('What registration does not guarantee'),
      p(
        'A working chat account does not guarantee access to WeChat Pay, Channels, advertising, public-account administration, or every mini program. Those products can have their own country, bank, business, identity, and regulatory requirements.',
      ),
      callout(
        'Safety warning',
        'Nobody should ask for your password or SMS login code to “verify” you. A legitimate helper follows the verification prompt from their own account.',
      ),
      links('Related WeChat guides', [
        {
          label: 'Complete WeChat registration guide',
          href: path('guides', 'wechat-registration-china-guide'),
        },
        {
          label: 'Phone number requirements',
          href: path('faq', 'wechat-phone-number-requirements'),
        },
      ]),
    ],
    faqs: [
      {
        question: 'Can I register for WeChat from the United States, Europe, or India?',
        answer:
          'Many users can attempt registration from these regions with supported mobile numbers. The result and checks depend on current availability, carrier delivery, and WeChat risk controls.',
      },
      {
        question: 'Do foreigners need a Chinese ID?',
        answer:
          'Not necessarily for basic registration. Some payment, business, or regulated features can require additional identity information.',
      },
    ],
  }),
  article({
    slug: 'wechat-qr-verification-guide',
    title: 'WeChat QR Verification: How Assisted Registration Works',
    seoTitle: 'WeChat QR Verification: How It Works Safely',
    description:
      'Understand WeChat QR or friend verification, helper eligibility, common failure reasons, and how to complete the process without exposing your account.',
    tags: ['wechat', 'qr verification', 'friend verification'],
    publishedAt: '2026-08-03T00:00:00Z',
    products: ['wechat-qr-scan', 'wechat-accounts'],
    related: [
      'wechat-registration-china-guide',
      'wechat-registration-failed',
      'can-foreigners-register-for-wechat',
    ],
    body: [
      p(
        'WeChat QR verification is an anti-abuse check that asks an existing eligible user to confirm a new registration or security action. The exact screen can show a QR code or instructions for the helper to use WeChat Team or an in-app verification flow. It is not the same as giving someone access to your account.',
      ),
      h('How the process normally works'),
      list(
        [
          'The applicant reaches an assisted-verification screen in the official app.',
          'An existing user opens the verification tool or scans the displayed QR code.',
          'WeChat checks whether that account is eligible to help.',
          'The helper confirms the request; the applicant then continues on their own device.',
        ],
        true,
      ),
      h('Why a helper may be rejected'),
      list([
        'The helper account is too new or is not in good standing',
        'The helper has assisted another user too recently',
        'Regional or payment-account conditions shown by WeChat are not met',
        'The QR code expired or belongs to an earlier registration attempt',
        'Repeated attempts triggered a temporary risk limit',
      ]),
      p(
        'Eligibility rules can change and are deliberately not fully predictable. The message shown in the app is the most relevant source for that specific attempt.',
      ),
      h('How to stay safe'),
      list([
        'Keep the registration on your own device',
        'Do not reveal your password, SMS code, or identity-document images to an unknown helper',
        'Do not install remote-control software',
        'Do not accept promises of guaranteed verification',
        'Stop if the request changes from scanning or confirming to taking over your device',
      ]),
      callout(
        'What Surjora can and cannot do',
        'A QR scan service can help when an eligible helper is genuinely available. It cannot bypass Tencent controls, guarantee eligibility, or replace identity checks required by WeChat.',
      ),
      links('Troubleshoot the next step', [
        {
          label: 'WeChat registration failed: what to do',
          href: path('tutorials', 'wechat-registration-failed'),
        },
        {
          label: 'Complete registration guide',
          href: path('guides', 'wechat-registration-china-guide'),
        },
      ]),
    ],
    faqs: [
      {
        question: 'Does the helper need my password?',
        answer:
          'No. A normal assisted-verification flow does not require the applicant to share a password or SMS code.',
      },
      {
        question: 'Why did an eligible-looking account fail to verify me?',
        answer:
          'WeChat applies multiple account, timing, region, and risk conditions. Follow the specific error shown and avoid repeated rapid attempts.',
      },
    ],
  }),
  article({
    slug: 'wechat-registration-failed',
    title: 'WeChat Registration Failed? Causes and Safe Fixes',
    seoTitle: 'WeChat Registration Failed: Causes and Fixes',
    description:
      'Diagnose missing SMS codes, rejected QR verification, unusual-activity warnings, and other WeChat signup failures without making the lock worse.',
    category: 'tutorials',
    tags: ['wechat', 'registration failed', 'troubleshooting'],
    publishedAt: '2026-08-04T00:00:00Z',
    products: ['account-assistance', 'wechat-qr-scan'],
    related: [
      'wechat-registration-china-guide',
      'wechat-qr-verification-guide',
      'wechat-phone-number-requirements',
    ],
    body: [
      p(
        'A failed WeChat signup usually comes from one of four areas: the phone number or SMS route, a risk-control limit, assisted-verification eligibility, or inconsistent registration details. Read the exact message before retrying; repeated attempts can extend a temporary restriction.',
      ),
      h('Match the symptom to the next step'),
      table(
        ['Symptom', 'Likely area', 'Safe next step'],
        [
          [
            'No SMS arrives',
            'Carrier filtering, wrong code, or request limit',
            'Confirm the country code, signal, and carrier support; wait before another request',
          ],
          [
            'QR or helper rejected',
            'Helper eligibility or expired request',
            'Generate a current request and use a helper who meets the displayed conditions',
          ],
          [
            'Suspicious or unusual activity',
            'Automated risk control',
            'Stop switching devices or networks and wait for the period shown',
          ],
          [
            'Number already registered',
            'Existing account or recycled number',
            'Use account recovery instead of creating another account',
          ],
          [
            'Identity mismatch',
            'Details do not match records',
            'Use accurate information and the official appeal path',
          ],
        ],
      ),
      h('Troubleshooting sequence'),
      list(
        [
          'Take a screenshot of the exact error without exposing private codes.',
          'Confirm you installed the official current app.',
          'Check the country code and whether the number can receive ordinary SMS.',
          'Use one stable device and network for the next attempt.',
          'If the number belongs to an existing account, choose login or recovery.',
          'Follow in-app Help or WeChat Security Center instructions when an appeal is offered.',
        ],
        true,
      ),
      h('When to wait'),
      p(
        'If the app mentions too many operations, a temporary restriction, or unusual activity, immediate retries are usually counterproductive. Wait for the stated period. If no period is shown, pause and use official support rather than cycling through numbers and devices.',
      ),
      callout(
        'Avoid “bypass” offers',
        'Services claiming to disable WeChat risk controls or guarantee registration are not legitimate. Assistance should remain within the official verification flow.',
      ),
      links('Check the relevant requirement', [
        {
          label: 'WeChat QR verification guide',
          href: path('guides', 'wechat-qr-verification-guide'),
        },
        {
          label: 'WeChat phone number requirements',
          href: path('faq', 'wechat-phone-number-requirements'),
        },
      ]),
    ],
    faqs: [
      {
        question: 'Should I keep requesting SMS codes?',
        answer:
          'No. Confirm the details once, then wait if the code does not arrive. Rapid requests can trigger carrier or platform limits.',
      },
      {
        question: 'Can a new phone number fix every registration error?',
        answer:
          'No. Device, network, identity, helper eligibility, and prior-account issues can remain. Diagnose the displayed error first.',
      },
    ],
  }),
  article({
    slug: 'wechat-phone-number-requirements',
    title: 'WeChat Phone Number Requirements Explained',
    seoTitle: 'WeChat Phone Number Requirements Explained',
    description:
      'Learn whether WeChat needs a Chinese number, which number types are safest, and why keeping access to the linked number matters.',
    category: 'faq',
    tags: ['wechat', 'phone number', 'sms'],
    publishedAt: '2026-08-05T00:00:00Z',
    products: ['chinese-phone-numbers', 'wechat-accounts'],
    related: [
      'wechat-registration-china-guide',
      'can-foreigners-register-for-wechat',
      'wechat-account-recovery-guide',
    ],
    body: [
      p(
        'WeChat does not universally require a mainland Chinese phone number. Many international mobile country codes can be used, subject to current regional availability, carrier SMS delivery, and WeChat security checks. The safest choice is a normal mobile number that belongs to you and will remain active.',
      ),
      h('Number options compared'),
      table(
        ['Number type', 'Suitability', 'Main risk'],
        [
          ['Your long-term mobile SIM', 'Best option', 'Keep the SIM and account details current'],
          [
            'International mobile number',
            'Often supported',
            'Some carriers or regions may have delivery issues',
          ],
          [
            'Mainland China mobile number',
            'Useful for China-based use cases',
            'Usually requires compliant real-name registration',
          ],
          [
            'VoIP or virtual number',
            'May be rejected or unreliable',
            'SMS routes and ownership can change',
          ],
          ['One-time SMS number', 'Not recommended', 'You may lose login and recovery access'],
        ],
      ),
      h('Why long-term control matters'),
      p(
        'The linked number may be needed for a new-device login, password reset, security review, or account recovery. Losing it does not always mean losing the account, but it makes recovery more difficult and can require other trusted-account evidence.',
      ),
      h('If your SMS code does not arrive'),
      list([
        'Check the selected country code and full number',
        'Confirm the SIM can receive other SMS messages',
        'Disable carrier spam filtering if appropriate',
        'Do not request codes repeatedly',
        'Try the official voice or help option only if WeChat offers it',
        'Contact the carrier and use WeChat support for persistent failures',
      ]),
      links('Registration and recovery guides', [
        {
          label: 'How to register for WeChat',
          href: path('guides', 'wechat-registration-china-guide'),
        },
        {
          label: 'WeChat account recovery guide',
          href: path('guides', 'wechat-account-recovery-guide'),
        },
      ]),
    ],
    faqs: [
      {
        question: 'Can I use the same phone number for multiple WeChat accounts?',
        answer:
          'A phone number is generally linked to one account at a time. Follow the current in-app flow if moving or replacing a linked number.',
      },
      {
        question: 'Will a Chinese number guarantee registration?',
        answer:
          'No. WeChat also evaluates device, network, account history, verification, and other risk signals.',
      },
    ],
  }),
  article({
    slug: 'how-to-keep-wechat-account-secure',
    title: 'How to Keep Your WeChat Account Secure',
    seoTitle: 'WeChat Account Security: Practical Checklist',
    description:
      'Protect WeChat with a unique password, a controlled phone number, login reviews, recovery preparation, and safer QR-code habits.',
    category: 'faq',
    tags: ['wechat', 'security', 'account safety'],
    publishedAt: '2026-05-20T00:00:00Z',
    products: ['account-assistance'],
    related: [
      'wechat-registration-china-guide',
      'wechat-account-recovery-guide',
      'wechat-qr-verification-guide',
    ],
    body: [
      p(
        'The most important WeChat security controls are a unique password, continued access to the linked phone number, careful review of new-device logins, and refusal to share SMS codes. WeChat may use several confirmation methods, but users should not assume a conventional authenticator-app “two-factor authentication” setting exists for every account.',
      ),
      h('Security checklist'),
      list([
        'Use a password that is unique to WeChat',
        'Keep the linked phone number active and update it through account settings before losing access',
        'Review logged-in devices and remove anything unfamiliar',
        'Add recovery or emergency-contact options when they are offered',
        'Use a device lock and keep the operating system and official WeChat app updated',
        'Treat unexpected QR codes, mini-program links, files, and payment requests as untrusted',
      ]),
      h('QR-code and verification safety'),
      p(
        'Scanning a QR code can authorize login, follow an account, open a mini program, or start another action. Read the confirmation screen before approving it. During assisted registration, the applicant should never give the helper a password, SMS code, payment PIN, or remote access.',
      ),
      h('If you see an unfamiliar login'),
      list(
        [
          'Remove the unfamiliar device in WeChat security settings',
          'Change the password from a trusted device',
          'Secure the linked email, phone carrier account, and device unlock code',
          'Check payment activity if WeChat Pay is enabled',
          'Use the official Security Center or support flow if access has already been lost',
        ],
        true,
      ),
      callout(
        'Payment protection',
        'Never reveal a payment PIN or approve a payment merely because a message appears to come from a contact. Contact accounts can be compromised.',
      ),
      links('Prepare for account problems', [
        {
          label: 'WeChat account recovery guide',
          href: path('guides', 'wechat-account-recovery-guide'),
        },
        {
          label: 'WeChat QR verification safety',
          href: path('guides', 'wechat-qr-verification-guide'),
        },
      ]),
    ],
    faqs: [
      {
        question: 'Does WeChat have two-factor authentication?',
        answer:
          'WeChat uses device, SMS, password, and risk-based confirmation flows, but users should not assume every account has a separate authenticator-app 2FA switch.',
      },
      {
        question: 'Is it safe to scan a WeChat QR code?',
        answer:
          'Only when you trust the source and read the action shown on the confirmation screen before approving it.',
      },
    ],
  }),
  article({
    slug: 'wechat-account-recovery-guide',
    title: 'WeChat Account Recovery: A Practical Guide',
    seoTitle: 'WeChat Account Recovery: Steps and Options',
    description:
      'Recover a WeChat account after a lost phone, forgotten password, changed number, or security restriction using official recovery options.',
    tags: ['wechat', 'account recovery', 'login'],
    publishedAt: '2026-08-06T00:00:00Z',
    products: ['account-assistance'],
    related: [
      'how-to-keep-wechat-account-secure',
      'wechat-phone-number-requirements',
      'wechat-registration-failed',
    ],
    body: [
      p(
        'Start recovery from the official WeChat login screen. The best route depends on what you still control: the linked phone number, a previously trusted device, a password, linked account details, or trusted contacts. Do not create a replacement account until you have checked whether the original number is already attached to the account you need.',
      ),
      h('Choose the recovery route that matches your situation'),
      table(
        ['Situation', 'First action', 'Evidence that may help'],
        [
          [
            'Forgotten password, phone available',
            'Use SMS login or password reset',
            'Linked number and trusted device',
          ],
          [
            'Phone number changed',
            'Use unable-to-log-in or appeal flow',
            'Old account details and prior device',
          ],
          [
            'Lost or replaced device',
            'Log in on the new device and complete security checks',
            'Linked phone and prior activity',
          ],
          [
            'Account restricted',
            'Open the Security Center or appeal shown',
            'Accurate identity and account history',
          ],
          [
            'Suspected takeover',
            'Secure phone/email first, then recover WeChat',
            'Carrier control, trusted device, payment records if applicable',
          ],
        ],
      ),
      h('Information to gather before an appeal'),
      list([
        'WeChat ID and linked phone number',
        'Approximate registration date and usual login region',
        'Devices previously used',
        'Trusted contacts who can identify the account if requested',
        'Accurate identity details used for regulated features',
        'Screenshots of the error, with codes and private data hidden',
      ]),
      h('After regaining access'),
      p(
        'Change the password, remove unknown devices, update the linked number, inspect payment activity, and warn contacts if suspicious messages were sent. Recovery outcomes are controlled by Tencent; no third party can guarantee an appeal result.',
      ),
      links('Prevent another lockout', [
        {
          label: 'WeChat security checklist',
          href: path('faq', 'how-to-keep-wechat-account-secure'),
        },
        {
          label: 'Phone number requirements',
          href: path('faq', 'wechat-phone-number-requirements'),
        },
      ]),
    ],
    faqs: [
      {
        question: 'Can Surjora recover any WeChat account?',
        answer:
          'No. Assistance can help you understand and follow official recovery steps, but Tencent decides the outcome.',
      },
      {
        question: 'Should I pay someone who promises an unlock?',
        answer:
          'Avoid guaranteed-unlock claims. Use the official Security Center and never share passwords, SMS codes, or payment PINs.',
      },
    ],
  }),
  article({
    slug: 'wechat-vs-wecom',
    title: 'WeChat vs WeCom: Which One Does Your Business Need?',
    seoTitle: 'WeChat vs WeCom: Business Comparison',
    description:
      'Compare personal WeChat and WeCom for messaging, customer relationships, team administration, compliance, and business operations.',
    category: 'comparisons',
    tags: ['wechat', 'wecom', 'comparison'],
    publishedAt: '2026-08-07T00:00:00Z',
    products: ['wechat-accounts', 'wecom-accounts'],
    related: ['wechat-registration-china-guide', 'what-is-wecom-wechat-work'],
    body: [
      p(
        'Use WeChat for an individual identity, personal conversations, groups, and consumer-facing participation. Use WeCom when an organization needs managed employee identities, internal collaboration, customer handover, administration, and integrations. Many China-facing teams use both because they solve different problems.',
      ),
      table(
        ['Capability', 'WeChat', 'WeCom'],
        [
          ['Primary identity', 'Individual user', 'Organization and employee'],
          [
            'Internal teamwork',
            'Informal chats and groups',
            'Managed contacts, roles, approvals, and workplace tools',
          ],
          [
            'Customer relationships',
            'Personal contact ownership',
            'Organization-managed customer connections and handover tools',
          ],
          ['Administration', 'Controlled by the individual', 'Central admin console and policies'],
          [
            'Best fit',
            'Personal networking and consumer use',
            'Teams, sales, service, and operations',
          ],
        ],
      ),
      h('Choose WeChat when'),
      list([
        'One person needs a normal social and messaging account',
        'Personal groups and direct conversations are the main use case',
        'There is no need for central employee offboarding or customer ownership',
      ]),
      h('Choose WeCom when'),
      list([
        'A company needs managed employee accounts',
        'Customer contacts should remain with the organization when staff leave',
        'Teams need permissions, approvals, records, or supported integrations',
        'The organization is prepared to complete applicable business verification',
      ]),
      callout(
        'Important limitation',
        'WeCom registration, organization verification, external-contact features, and integrations can have separate business-document and region requirements. A personal WeChat account does not replace them.',
      ),
      links('Learn each platform', [
        {
          label: 'Complete WeChat registration guide',
          href: path('guides', 'wechat-registration-china-guide'),
        },
        { label: 'What is WeCom?', href: path('faq', 'what-is-wecom-wechat-work') },
      ]),
    ],
    faqs: [
      {
        question: 'Is WeCom the same app as WeChat?',
        answer:
          'No. WeCom is a separate enterprise app, although supported features connect organizations and employees with WeChat users.',
      },
      {
        question: 'Can a small business use only WeChat?',
        answer:
          'It can for informal communication, but WeCom is better when the business needs central administration and customer continuity.',
      },
    ],
  }),

  // Priority 0 correction and Priority 2 foundational platform content.
  article({
    slug: 'why-buy-verified-alipay-account',
    title: 'Alipay Verification: What It Means and Why It Matters',
    seoTitle: 'Alipay Verification: Requirements and Limits',
    description:
      'Understand Alipay identity verification, why features vary by country and account type, and why you should use accurate, owner-controlled details.',
    tags: ['alipay', 'verification', 'payments'],
    publishedAt: '2026-07-05T00:00:00Z',
    products: ['alipay-accounts', 'chinese-verification'],
    related: ['alipay-account-guide', 'taobao-account-guide'],
    body: [
      p(
        'Alipay verification links an account to identity information so the platform can apply payment, security, and regulatory controls. It does not create a universal “fully verified” tier that guarantees every wallet, transfer, merchant, or Alipay+ feature. Availability depends on account type, country, identity document, bank or card support, and the product being used.',
      ),
      callout(
        'Ownership matters',
        'Use identity and contact details that belong to the person or business controlling the account. Mismatched or transferred identities can cause restrictions and make recovery difficult.',
      ),
      h('What verification can affect'),
      list([
        'Account recovery and security review',
        'Access to specific wallet or payment functions',
        'Transaction limits and compliance checks',
        'Use of supported cards, bank accounts, or merchant products',
        'Eligibility for services that require a verified real-name identity',
      ]),
      h('Personal and merchant accounts are different'),
      p(
        'A personal Alipay account used by a visitor is not the same as a mainland wallet or a merchant acquiring account. Merchant acceptance, settlement, Alipay+ participation, and business dashboards require separate onboarding and agreements; personal verification alone does not unlock them.',
      ),
      h('Safe verification checklist'),
      list([
        'Download the official app for the service you intend to use',
        'Select the correct country or region',
        'Use your own phone number and identity document',
        'Confirm the name matches your card or bank records',
        'Read the feature eligibility and fee information shown in the app',
        'Never rent identity documents or buy access represented as permanently guaranteed',
      ]),
      links('Related payment and commerce guides', [
        { label: 'Alipay account guide', href: path('guides', 'alipay-account-guide') },
        { label: 'Taobao account guide', href: path('guides', 'taobao-account-guide') },
      ]),
    ],
    faqs: [
      {
        question: 'Does Alipay verification unlock every feature?',
        answer:
          'No. Features vary by country, account type, payment instrument, merchant status, and current compliance rules.',
      },
      {
        question: 'Can I verify with someone else’s identity?',
        answer:
          'You should not. The account, identity, phone, and payment details should belong to the legitimate controller.',
      },
    ],
  }),
  article({
    slug: 'how-to-receive-sms-verification-china',
    title: 'How to Receive SMS Codes from Chinese Platforms',
    seoTitle: 'Chinese SMS Verification Codes: Safe Guide',
    description:
      'Learn why Chinese platform SMS codes fail, when a mainland number is actually required, and how to choose a number you can keep for recovery.',
    category: 'tutorials',
    tags: ['sms', 'verification', 'chinese phone number'],
    publishedAt: '2026-06-20T00:00:00Z',
    products: ['chinese-phone-numbers', 'chinese-verification'],
    related: ['chinese-phone-number-guide', 'wechat-phone-number-requirements'],
    body: [
      p(
        'First check whether the platform accepts your existing international mobile number. A mainland Chinese number is required for some domestic services, but not for every Chinese app. If a local number is necessary, use a legally registered number you can keep—not a public one-time SMS inbox.',
      ),
      h('Why codes do not arrive'),
      list([
        'Wrong country code or number format',
        'The service does not support that country or number type',
        'Carrier filtering or blocked international application-to-person SMS',
        'Too many recent requests',
        'Roaming, signal, or SIM-account problems',
        'The number was previously linked to another account',
      ]),
      h('Safe troubleshooting order'),
      list(
        [
          'Verify the country code and remove accidental leading digits.',
          'Confirm the SIM receives ordinary messages.',
          'Wait before requesting another code.',
          'Check spam controls and ask the carrier whether application SMS is blocked.',
          'Use a voice-code option only when the official app offers one.',
          'Contact the platform through its official help channel.',
        ],
        true,
      ),
      h('Avoid disposable numbers'),
      p(
        'Registration is only the first use of a phone number. Platforms may send future login, risk-review, password-reset, or recovery codes. Losing the number can turn a minor login problem into an unrecoverable account.',
      ),
      callout(
        'Never share a verification code',
        'An SMS code proves control of your number. Support staff and legitimate helpers should not ask you to forward a login or payment code.',
      ),
      links('Phone-number planning', [
        { label: 'Chinese phone number guide', href: path('guides', 'chinese-phone-number-guide') },
        {
          label: 'WeChat phone number requirements',
          href: path('faq', 'wechat-phone-number-requirements'),
        },
      ]),
    ],
    faqs: [
      {
        question: 'Do all Chinese apps require a +86 number?',
        answer:
          'No. Requirements vary. Check the official signup screen and documentation for the specific service.',
      },
      {
        question: 'Is a one-time SMS service enough?',
        answer:
          'It is unsafe for an account you need to retain because the same number may be required for recovery.',
      },
    ],
  }),
  article({
    slug: 'qq-account-guide',
    title: 'QQ Account Guide: Registration, Login, and Security',
    seoTitle: 'QQ Account Guide: Registration and Security',
    description:
      'A practical introduction to QQ accounts, phone registration, QQ Mail, login security, recovery, and common limitations for international users.',
    tags: ['qq', 'qq account', 'qq mail'],
    featured: true,
    publishedAt: '2026-08-08T00:00:00Z',
    products: ['qq-accounts', 'chinese-phone-numbers', 'chinese-email-accounts'],
    related: ['chinese-email-account-guide', 'chinese-phone-number-guide'],
    body: [
      p(
        'QQ is a Tencent account system used for messaging, groups, QQ Mail, games, and sign-in to supported services. Registration normally begins with a mobile number, but availability and anti-abuse checks vary by country, device, network, and time.',
      ),
      h('What a QQ account can include'),
      list([
        'A numeric QQ ID and profile',
        'Direct messages, contacts, and groups',
        'Access to QQ Mail when available',
        'Login to Tencent and third-party services that still support QQ',
        'Separate eligibility checks for games, payments, or regulated features',
      ]),
      h('Registration basics'),
      list(
        [
          'Use the official QQ app or official registration page.',
          'Choose the correct country code and enter a number you control.',
          'Complete the SMS and security checks shown.',
          'Set a unique password and record the QQ number.',
          'Add recovery options and review devices after the first login.',
        ],
        true,
      ),
      h('Common international-user problems'),
      p(
        'An international number may not be accepted at a particular moment, an SMS route may fail, or risk control may reject repeated attempts. Switching rapidly between numbers, devices, VPN exits, and emulators can make the risk signal worse. Stop and follow the official help path when a limit appears.',
      ),
      h('QQ and QQ Mail security'),
      list([
        'Keep control of the linked phone',
        'Use a unique password and protect the recovery email',
        'Do not share QR-login approvals or SMS codes',
        'Review unfamiliar sessions',
        'Treat account transfers as high risk because original registration evidence may remain important',
      ]),
      links('Related identity guides', [
        {
          label: 'Chinese email account guide',
          href: path('guides', 'chinese-email-account-guide'),
        },
        { label: 'Chinese phone number guide', href: path('guides', 'chinese-phone-number-guide') },
      ]),
    ],
    faqs: [
      {
        question: 'Is QQ still useful?',
        answer:
          'Yes for QQ messaging, communities, QQ Mail, games, and services that support QQ sign-in, although the best platform depends on your audience and task.',
      },
      {
        question: 'Does a QQ account automatically include every Tencent service?',
        answer:
          'No. Individual services can require separate profiles, verification, region eligibility, or agreements.',
      },
    ],
  }),
  article({
    slug: 'alipay-account-guide',
    title: 'Alipay Account Guide for International Users',
    seoTitle: 'Alipay Account Guide for International Users',
    description:
      'Learn how Alipay signup, identity verification, cards, payments, Tour Card-style visitor services, and merchant accounts differ.',
    tags: ['alipay', 'payments', 'international users'],
    featured: true,
    publishedAt: '2026-08-08T00:00:00Z',
    products: ['alipay-accounts', 'chinese-verification'],
    related: ['why-buy-verified-alipay-account', 'taobao-account-guide'],
    body: [
      p(
        'Alipay is a payment and digital-services platform. International users can often create an account and use supported foreign cards for eligible transactions, but the exact experience depends on country, identity verification, card issuer, merchant, transaction type, and current app rules.',
      ),
      h('Three use cases that should not be confused'),
      table(
        ['Use case', 'Typical user', 'Key requirement'],
        [
          [
            'Visitor payments',
            'Traveler paying supported merchants',
            'Supported account, identity, card, and transaction',
          ],
          [
            'Mainland wallet features',
            'Eligible mainland user',
            'Mainland identity, banking, and regulatory requirements may apply',
          ],
          [
            'Merchant acceptance',
            'Business receiving payments',
            'Separate merchant onboarding, contracts, and settlement setup',
          ],
        ],
      ),
      h('Basic setup sequence'),
      list(
        [
          'Install the official Alipay app and select the correct region.',
          'Register with a phone number you control.',
          'Complete identity verification requested for your intended feature.',
          'Add a supported card or other payment method.',
          'Check fees, limits, exchange rates, and merchant acceptance before relying on it.',
          'Set a payment password and secure the device.',
        ],
        true,
      ),
      h('Important limitations'),
      p(
        'A card that can be added may still be declined for a particular merchant or transaction. Person-to-person transfers, wallet balances, red packets, financial products, and merchant tools may have stricter eligibility. Keep a backup payment method when traveling.',
      ),
      callout(
        'Use your own identity',
        'Payment accounts should use the legitimate owner’s phone, identity, and payment details. Transferred or mismatched accounts carry security, recovery, and compliance risks.',
      ),
      links('Understand verification and shopping', [
        {
          label: 'Alipay verification explained',
          href: path('guides', 'why-buy-verified-alipay-account'),
        },
        { label: 'Taobao account guide', href: path('guides', 'taobao-account-guide') },
      ]),
    ],
    faqs: [
      {
        question: 'Can foreigners use Alipay?',
        answer:
          'Many international users can register and use supported features, but availability depends on country, identity, card, merchant, and transaction type.',
      },
      {
        question: 'Is a personal Alipay account a merchant account?',
        answer:
          'No. Receiving and settling merchant payments requires separate business onboarding.',
      },
    ],
  }),
  article({
    slug: 'what-is-wecom-wechat-work',
    title: 'What Is WeCom? A Guide to WeChat Work for Businesses',
    seoTitle: 'What Is WeCom? Business Account Guide',
    description:
      'Learn how WeCom supports managed employee accounts, internal collaboration, WeChat customer contact, verification, and integrations.',
    category: 'faq',
    tags: ['wecom', 'wechat work', 'business'],
    featured: true,
    publishedAt: '2026-06-25T00:00:00Z',
    products: ['wecom-accounts', 'account-assistance'],
    related: ['wechat-vs-wecom', 'wechat-registration-china-guide'],
    body: [
      p(
        'WeCom—formerly branded internationally as WeChat Work—is Tencent’s enterprise communication and customer-connection platform. It gives an organization managed employee identities, administration, workplace tools, and supported ways to communicate with WeChat users.',
      ),
      h('Core use cases'),
      list([
        'Internal messaging, contacts, groups, meetings, calendars, and documents',
        'Employee onboarding, permissions, and offboarding',
        'Customer contact that can remain associated with the organization',
        'Supported CRM, bot, API, and workflow integrations',
        'Organization announcements, approvals, attendance, and operational apps',
      ]),
      h('Account and organization setup'),
      p(
        'An administrator creates or joins an organization, invites employees, and configures departments and permissions. Some external-contact, API, branding, or regulated features may require organization verification and eligible business documentation. Requirements vary by entity and region.',
      ),
      h('WeCom is not a bulk-messaging loophole'),
      p(
        'Customer-contact tools are subject to platform rules, consent expectations, frequency controls, and anti-spam enforcement. Teams should define who owns customer relationships, what data is retained, and how departing staff contacts are handled.',
      ),
      h('When WeCom is a good fit'),
      list([
        'Multiple staff members communicate with China-based customers',
        'The company needs central account ownership',
        'Managers need permissions and auditability',
        'The team has a legitimate entity and can complete required verification',
      ]),
      links('Compare the Tencent tools', [
        { label: 'WeChat vs WeCom', href: path('comparisons', 'wechat-vs-wecom') },
        {
          label: 'WeChat registration guide',
          href: path('guides', 'wechat-registration-china-guide'),
        },
      ]),
    ],
    faqs: [
      {
        question: 'Can WeCom message WeChat users?',
        answer:
          'Supported external-contact features can connect employees with WeChat users, subject to organization setup and platform rules.',
      },
      {
        question: 'Does every business need WeCom?',
        answer:
          'No. It is most useful when a team needs managed identities, customer continuity, permissions, or integrations.',
      },
    ],
  }),
  article({
    slug: 'xiaohongshu-account-guide',
    title: 'Xiaohongshu (RED) Account Guide',
    seoTitle: 'Xiaohongshu Account Guide: Signup and Use',
    description:
      'Understand Xiaohongshu signup, identity and creator checks, search-led content, community expectations, and account security.',
    tags: ['xiaohongshu', 'rednote', 'account guide'],
    featured: true,
    publishedAt: '2026-08-09T00:00:00Z',
    products: ['xiaohongshu-accounts'],
    related: ['getting-started-xiaohongshu-content', 'douyin-account-guide'],
    body: [
      p(
        'Xiaohongshu—also called RED or RedNote—is a discovery and community platform where users search and browse posts about products, travel, beauty, food, lifestyle, and many other interests. A normal account can browse and publish, while professional, shop, advertising, and monetization features have additional requirements.',
      ),
      h('Account setup basics'),
      list(
        [
          'Install the official app available for your region.',
          'Register with a supported phone number or offered sign-in method.',
          'Choose a clear profile identity without impersonating another person or brand.',
          'Complete any security or identity check requested for the feature you use.',
          'Secure the linked number and review account settings.',
        ],
        true,
      ),
      h('How discovery works'),
      p(
        'Xiaohongshu combines recommendation feeds with strong in-app search. Useful titles, specific captions, clear visuals, topic relevance, saves, comments, and audience satisfaction matter more than repeating keywords. Search behavior makes evergreen how-to and decision content particularly valuable.',
      ),
      h('Personal, professional, and shop functions'),
      table(
        ['Account use', 'Purpose', 'Possible extra requirements'],
        [
          [
            'Personal/creator',
            'Browse, save, comment, and publish notes',
            'Identity or creator checks for some features',
          ],
          [
            'Professional/brand',
            'Official presence and business tools',
            'Entity documents and verification',
          ],
          [
            'Shop/commerce',
            'Sell through supported commerce products',
            'Merchant eligibility, product, tax, and settlement setup',
          ],
        ],
      ),
      h('Account safety and compliance'),
      list([
        'Use original or licensed media',
        'Disclose commercial relationships where required',
        'Avoid misleading medical, financial, or product claims',
        'Do not automate engagement or buy fake activity',
        'Keep ownership and identity details accurate',
      ]),
      links('Plan your first content', [
        {
          label: 'Xiaohongshu content marketing tutorial',
          href: path('tutorials', 'getting-started-xiaohongshu-content'),
        },
        { label: 'Douyin account guide', href: path('guides', 'douyin-account-guide') },
      ]),
    ],
    faqs: [
      {
        question: 'Is Xiaohongshu only for beauty content?',
        answer:
          'No. Beauty is prominent, but the platform covers travel, food, fashion, education, technology, hobbies, and many other categories.',
      },
      {
        question: 'Can a foreign brand open an official account?',
        answer:
          'Potentially, subject to current entity, region, verification, and business-feature requirements.',
      },
    ],
  }),
  article({
    slug: 'getting-started-xiaohongshu-content',
    title: 'Getting Started with Xiaohongshu Content Marketing',
    seoTitle: 'Xiaohongshu Content Marketing: Starter Guide',
    description:
      'Build a useful Xiaohongshu content plan with search research, clear visual notes, community participation, measurement, and compliant claims.',
    category: 'tutorials',
    tags: ['xiaohongshu', 'content marketing', 'rednote'],
    publishedAt: '2026-06-15T00:00:00Z',
    products: ['xiaohongshu-accounts'],
    related: ['xiaohongshu-account-guide'],
    body: [
      p(
        'Start Xiaohongshu marketing by identifying a real audience question and creating a note that answers it visually and specifically. The platform is both a recommendation feed and a search engine, so durable how-to, comparison, checklist, and experience-based content can keep being discovered.',
      ),
      h('A practical first-month workflow'),
      list(
        [
          'Define one audience and three recurring problems.',
          'Search those problems in Xiaohongshu and study wording, formats, and unanswered questions.',
          'Create a small set of repeatable content formats.',
          'Publish useful notes with clear covers and honest titles.',
          'Reply to substantive comments and record new questions.',
          'Review search terms, saves, completion, profile visits, and qualified inquiries.',
          'Improve the next batch based on evidence rather than posting volume alone.',
        ],
        true,
      ),
      h('Structure of a useful note'),
      list([
        'Cover: readable promise without clickbait',
        'Title: natural phrase matching the user’s problem',
        'Opening: answer or result early',
        'Body: steps, comparisons, examples, or proof',
        'Ending: a relevant question or next step',
        'Disclosure: commercial relationship or limitation when applicable',
      ]),
      h('What to avoid'),
      p(
        'Do not copy popular notes, fabricate personal experience, hide paid relationships, make unsupported claims, or use automation to manufacture engagement. These tactics weaken trust and can create platform risk.',
      ),
      h('Measure business value'),
      p(
        'Likes alone do not show whether content works. Track saves, meaningful comments, search discovery, profile actions, qualified messages, and downstream outcomes appropriate to the account. Compare topics and formats over several posts before drawing conclusions.',
      ),
      links('Start with the platform basics', [
        { label: 'Xiaohongshu account guide', href: path('guides', 'xiaohongshu-account-guide') },
      ]),
    ],
    faqs: [
      {
        question: 'How often should a new account post?',
        answer:
          'Choose a sustainable cadence that preserves quality. Consistency helps learning, but there is no universal posting frequency that guarantees reach.',
      },
      {
        question: 'Should I translate content from another platform?',
        answer:
          'Reuse research, but adapt the angle, language, visuals, and community context for Xiaohongshu rather than copying it unchanged.',
      },
    ],
  }),
  article({
    slug: 'douyin-account-guide',
    title: 'Douyin Account Guide for Creators and Businesses',
    seoTitle: 'Douyin Account Guide: Setup, Content, Commerce',
    description:
      'Learn how Douyin differs from TikTok, what account setup involves, and how creator, business, advertising, and commerce features are separated.',
    tags: ['douyin', 'account guide', 'china video'],
    featured: true,
    publishedAt: '2026-08-09T00:00:00Z',
    products: ['douyin-accounts'],
    related: [
      'douyin-vs-tiktok-differences',
      'xiaohongshu-account-guide',
      'bilibili-account-guide',
    ],
    body: [
      p(
        'Douyin is ByteDance’s mainland China short-video and live-content platform. It is related to TikTok but operates as a separate service with different accounts, content, commerce infrastructure, advertising products, rules, and user ecosystem.',
      ),
      h('Account layers'),
      table(
        ['Layer', 'Typical use', 'Additional setup'],
        [
          [
            'Personal/creator',
            'Watch, publish, follow, and interact',
            'Phone and risk checks; identity for some features',
          ],
          [
            'Business identity',
            'Brand presence and business tools',
            'Entity verification and category eligibility',
          ],
          ['Advertising', 'Paid campaign management', 'Advertiser onboarding, review, and funding'],
          [
            'Commerce/live selling',
            'Shop, product, affiliate, or live functions',
            'Merchant, product, identity, settlement, and content requirements',
          ],
        ],
      ),
      h('Setup principles'),
      list([
        'Use the official Douyin app and an account controlled by the real operator',
        'Keep access to the linked phone number',
        'Complete identity or entity verification only with accurate documents',
        'Read current rules for the intended content and industry',
        'Separate organic content planning from advertising and shop onboarding',
      ]),
      h('Content and distribution'),
      p(
        'Douyin recommendations respond to viewer behavior and content relevance. Strong openings, clear storytelling, completion, genuine interaction, search relevance, and audience fit matter. No posting schedule or engagement tactic guarantees distribution.',
      ),
      h('Operational risks'),
      list([
        'Assuming a TikTok login works on Douyin',
        'Using an account whose identity or recovery details belong to someone else',
        'Making regulated claims without approval',
        'Treating creator access as automatic shop or advertising eligibility',
        'Using fake engagement or unauthorized automation',
      ]),
      links('Compare China video platforms', [
        { label: 'Douyin vs TikTok', href: path('comparisons', 'douyin-vs-tiktok-differences') },
        { label: 'Bilibili account guide', href: path('guides', 'bilibili-account-guide') },
      ]),
    ],
    faqs: [
      {
        question: 'Can I log into Douyin with TikTok?',
        answer: 'No. They are separate platforms and account systems.',
      },
      {
        question: 'Does a Douyin account include a shop?',
        answer: 'No. Commerce features require separate eligibility and onboarding.',
      },
    ],
  }),
  article({
    slug: 'douyin-vs-tiktok-differences',
    title: 'Douyin vs TikTok: Key Differences',
    seoTitle: 'Douyin vs TikTok: Accounts, Content, Commerce',
    description:
      'Compare Douyin and TikTok across account systems, audiences, content, search, commerce, advertising, and market access.',
    category: 'comparisons',
    tags: ['douyin', 'tiktok', 'comparison'],
    publishedAt: '2026-07-01T00:00:00Z',
    products: ['douyin-accounts'],
    related: ['douyin-account-guide'],
    body: [
      p(
        'Douyin and TikTok share ByteDance roots and a short-video format, but they are separate products. They do not share normal user accounts or content libraries, and each has its own market, rules, commerce tools, advertising systems, and creator ecosystem.',
      ),
      table(
        ['Area', 'Douyin', 'TikTok'],
        [
          ['Primary market', 'Mainland China', 'Markets outside mainland China'],
          ['Account', 'Separate Douyin registration', 'Separate TikTok registration'],
          [
            'Content ecosystem',
            'Mandarin-first domestic trends and services',
            'Market-specific global content',
          ],
          [
            'Commerce',
            'Deep domestic shop, local-service, live, and affiliate ecosystem',
            'Commerce availability varies widely by country',
          ],
          [
            'Advertising',
            'Mainland-focused products and onboarding',
            'Regional TikTok for Business products',
          ],
          [
            'Access strategy',
            'Requires a China-specific operating plan',
            'Requires a plan for each target country',
          ],
        ],
      ),
      h('Which platform should you choose?'),
      p(
        'Choose Douyin when the audience, offer, operations, and compliance plan are focused on mainland China. Choose TikTok for supported audiences outside mainland China. A global brand may use both, but should build separate accounts, content calendars, creative adaptations, and measurement.',
      ),
      h('Do not simply repost everything'),
      list([
        'Adapt language and references',
        'Research platform-native search and trends',
        'Confirm music and media rights for each platform',
        'Use the correct commerce and disclosure tools',
        'Measure results separately',
      ]),
      links('Plan a Douyin account', [
        { label: 'Douyin account guide', href: path('guides', 'douyin-account-guide') },
      ]),
    ],
    faqs: [
      {
        question: 'Is Douyin just TikTok in Chinese?',
        answer:
          'No. The interface concept is similar, but the services, accounts, content, commerce, advertising, and rules are separate.',
      },
      {
        question: 'Can the same video work on both?',
        answer:
          'Sometimes, but it should be adapted for language, audience context, rights, trends, and platform rules.',
      },
    ],
  }),
  article({
    slug: 'taobao-account-guide',
    title: 'Taobao Account Guide for International Shoppers',
    seoTitle: 'Taobao Account Guide: Signup, Buying, Safety',
    description:
      'Learn how Taobao signup, Alipay payments, addresses, seller checks, consolidation, returns, and account security work for overseas shoppers.',
    tags: ['taobao', 'shopping', 'account guide'],
    featured: true,
    publishedAt: '2026-08-10T00:00:00Z',
    products: ['taobao-accounts', 'alipay-accounts'],
    related: ['alipay-account-guide', '1688-account-guide', 'jd-account-guide'],
    body: [
      p(
        'Taobao is a consumer marketplace within Alibaba’s ecosystem. International shoppers can often browse and register, but payment methods, direct shipping, consolidation, restricted goods, returns, and customer support differ by destination and seller.',
      ),
      h('Before placing an order'),
      list([
        'Register with a phone number you control and secure the account',
        'Set up an eligible Alipay payment method',
        'Confirm whether the seller or official logistics route serves your destination',
        'Translate the full product specification, variants, quantity, and seller terms',
        'Estimate domestic freight, international shipping, duties, taxes, and return cost',
      ]),
      h('Direct shipping, consolidation, and agents'),
      table(
        ['Method', 'How it works', 'Best when'],
        [
          [
            'Direct shipping',
            'Seller or platform route ships to you',
            'The item and destination are supported',
          ],
          [
            'Official consolidation',
            'Orders go to a warehouse and are combined',
            'You understand warehouse deadlines and restricted-item rules',
          ],
          [
            'Buying agent',
            'A third party purchases and may inspect or forward',
            'Direct signup, payment, language, or logistics are difficult',
          ],
        ],
      ),
      h('Seller and product checks'),
      p(
        'Review the store history, detailed ratings, buyer photos, specifications, return terms, and recent feedback. A high sales count does not prove that a product is authentic or suitable. For branded or safety-critical items, prefer authorized channels and verify documentation.',
      ),
      h('Returns and disputes'),
      p(
        'Keep order-page evidence and communicate inside the platform. Cross-border returns can cost more than the item, and warehouse inspection may be limited. Read current dispute deadlines before confirming receipt.',
      ),
      links('Compare marketplace options', [
        { label: 'Alipay account guide', href: path('guides', 'alipay-account-guide') },
        { label: '1688 sourcing guide', href: path('guides', '1688-account-guide') },
        { label: 'JD account guide', href: path('guides', 'jd-account-guide') },
      ]),
    ],
    faqs: [
      {
        question: 'Is Taobao the same as 1688?',
        answer:
          'No. Taobao is primarily a consumer marketplace; 1688 is oriented toward domestic wholesale and supply.',
      },
      {
        question: 'Can every Taobao item ship internationally?',
        answer:
          'No. Destination, seller, item category, size, and logistics restrictions all matter.',
      },
    ],
  }),
  article({
    slug: '1688-account-guide',
    title: '1688 Account and Sourcing Guide',
    seoTitle: '1688 Sourcing Guide: Account, Suppliers, Orders',
    description:
      'Use 1688 more safely by understanding wholesale listings, supplier checks, samples, domestic logistics, payments, agents, and quality control.',
    tags: ['1688', 'sourcing', 'wholesale'],
    featured: true,
    publishedAt: '2026-08-10T00:00:00Z',
    products: ['1688-accounts', 'account-assistance'],
    related: ['taobao-account-guide', 'alipay-account-guide'],
    body: [
      p(
        '1688 is Alibaba Group’s mainland China wholesale marketplace. It can help buyers discover factories, trading companies, and domestic suppliers, but it is not a guarantee of factory status, export readiness, product compliance, or quality. Treat it as a sourcing database and transaction platform that still requires due diligence.',
      ),
      h('A safer sourcing workflow'),
      list(
        [
          'Write a product specification with materials, dimensions, tolerances, packaging, labeling, testing, and target quantity.',
          'Shortlist multiple suppliers and compare like-for-like quotations.',
          'Verify business details, operating history, claimed capabilities, and whether the company is a manufacturer or trader.',
          'Order samples and test them against the written specification.',
          'Agree on inspection, defect handling, payment milestones, and delivery terms.',
          'Use pre-shipment quality control before paying the final balance when risk justifies it.',
          'Plan domestic pickup, export, freight, customs, tax, and destination compliance.',
        ],
        true,
      ),
      h('Listing signals are not proof'),
      p(
        'Badges, transaction counts, photos, and years on the platform can be useful inputs, but they do not replace business-license checks, video or onsite verification, samples, contracts, and independent inspection. Product images may also be reused across listings.',
      ),
      h('Account, payment, and logistics limits'),
      p(
        '1688 is designed for domestic Chinese trade. International phone registration, payment, customer support, invoicing, and shipping may be difficult depending on the buyer. A sourcing or purchasing agent can help, but the buyer should understand the agent’s fees, custody of funds, inspection scope, and dispute responsibility.',
      ),
      h('Common cost mistakes'),
      list([
        'Comparing only unit price',
        'Ignoring minimum order and packaging quantities',
        'Assuming domestic freight is included',
        'Skipping sample and inspection costs',
        'Forgetting tooling, labeling, certification, duties, and returns',
        'Using an exchange rate without payment and agent fees',
      ]),
      callout(
        'No fictional outcomes',
        'Surjora does not publish sourcing “case studies” without real, attributable evidence. Results vary by product, supplier, contract, quality control, logistics, and market.',
      ),
      links('Related commerce guides', [
        { label: 'Taobao account guide', href: path('guides', 'taobao-account-guide') },
        { label: 'Alipay account guide', href: path('guides', 'alipay-account-guide') },
      ]),
    ],
    faqs: [
      {
        question: 'Are all 1688 sellers factories?',
        answer:
          'No. Sellers can include manufacturers, trading companies, distributors, and other businesses. Verify the specific supplier.',
      },
      {
        question: 'Does 1688 ship internationally?',
        answer:
          'It is mainly a domestic marketplace. Buyers often need a supported logistics route, freight forwarder, or purchasing agent.',
      },
    ],
  }),
  article({
    slug: 'jd-account-guide',
    title: 'JD.com Account Guide for Shoppers',
    seoTitle: 'JD.com Account Guide: Signup and Shopping',
    description:
      'Understand JD account setup, self-operated versus marketplace listings, payment, delivery, authenticity checks, and overseas limitations.',
    tags: ['jd.com', 'jingdong', 'shopping'],
    featured: true,
    publishedAt: '2026-08-11T00:00:00Z',
    products: ['jd-accounts'],
    related: ['taobao-account-guide', 'alipay-account-guide'],
    body: [
      p(
        'JD.com, also known as Jingdong, is a major Chinese e-commerce platform. It combines JD-operated retail and logistics with third-party marketplace sellers. Account registration, payment, delivery, and after-sales options depend on region and the specific listing.',
      ),
      h('JD-operated and marketplace listings'),
      table(
        ['Listing type', 'Who sells', 'What to verify'],
        [
          [
            'JD self-operated',
            'JD retail operation',
            'Exact seller label, stock, warranty, and delivery area',
          ],
          [
            'Official flagship store',
            'Brand or authorized operator',
            'Store verification and product warranty',
          ],
          [
            'Third-party marketplace',
            'Independent seller',
            'Seller record, reviews, invoice, returns, and authenticity evidence',
          ],
        ],
      ),
      h('Shopping workflow'),
      list(
        [
          'Create and secure the account with a supported phone number.',
          'Confirm the seller—not only the product page design.',
          'Check model, variant, warranty region, voltage, language, and included accessories.',
          'Verify payment and address support.',
          'Read delivery, inspection, invoice, and return terms.',
          'Keep order records until the warranty period is clear.',
        ],
        true,
      ),
      h('Overseas buyer limitations'),
      p(
        'Many listings are intended for mainland delivery. International cards, addresses, cross-border shipping, warranties, and customer support may be limited. A freight forwarder can move a parcel but does not automatically solve restricted goods, batteries, customs declarations, returns, or warranty service.',
      ),
      links('Compare Chinese marketplaces', [
        { label: 'Taobao account guide', href: path('guides', 'taobao-account-guide') },
        { label: 'Alipay account guide', href: path('guides', 'alipay-account-guide') },
      ]),
    ],
    faqs: [
      {
        question: 'Is every JD listing sold directly by JD?',
        answer:
          'No. Check whether the seller is JD self-operated, an official store, or a third-party marketplace merchant.',
      },
      {
        question: 'Can JD orders be forwarded overseas?',
        answer:
          'Sometimes, but item, carrier, customs, warranty, address, and forwarder restrictions must all be checked.',
      },
    ],
  }),
  article({
    slug: 'baidu-account-guide',
    title: 'Baidu Account Guide: Signup, Login, and Services',
    seoTitle: 'Baidu Account Guide: Signup and Security',
    description:
      'Learn what a Baidu account is used for, how phone registration and identity checks work, and why each Baidu service has separate rules.',
    tags: ['baidu', 'account guide', 'china internet'],
    featured: true,
    publishedAt: '2026-08-11T00:00:00Z',
    products: ['baidu-accounts', 'chinese-phone-numbers'],
    related: ['chinese-phone-number-guide', 'chinese-email-account-guide'],
    body: [
      p(
        'A Baidu account can provide identity and login across supported Baidu products, such as community, cloud, maps, content, and developer services. It does not automatically grant every feature: individual products can require separate profiles, real-name checks, payment, developer review, or mainland eligibility.',
      ),
      h('Registration and login basics'),
      list(
        [
          'Use the official Baidu site or app for the service you need.',
          'Register with a supported phone number and complete the displayed security check.',
          'Set a unique password and record the account identity.',
          'Add recovery details when available.',
          'Complete real-name or business verification only when the service legitimately requires it.',
        ],
        true,
      ),
      h('Why international registration can be difficult'),
      p(
        'Country-code support, SMS delivery, anti-abuse controls, and service-specific interfaces can vary. A number accepted for one Baidu flow may not make every product available. Repeated automated or rapid registration attempts can trigger risk controls.',
      ),
      h('Service-specific planning'),
      table(
        ['Goal', 'Check before relying on the account'],
        [
          ['Baidu search/community', 'Posting, moderation, and identity rules'],
          ['Baidu Netdisk', 'Storage, download, client, and identity requirements'],
          ['Maps/local services', 'Region and listing-management eligibility'],
          [
            'Developer or advertising products',
            'Business entity, billing, API, and review requirements',
          ],
        ],
      ),
      h('Security'),
      list([
        'Keep the linked number active',
        'Do not approve unknown QR logins',
        'Protect cloud files and API credentials separately',
        'Review security alerts through official channels',
        'Avoid accounts with mismatched ownership or recovery details',
      ]),
      links('Prepare contact details', [
        { label: 'Chinese phone number guide', href: path('guides', 'chinese-phone-number-guide') },
        {
          label: 'Chinese email account guide',
          href: path('guides', 'chinese-email-account-guide'),
        },
      ]),
    ],
    faqs: [
      {
        question: 'Does one Baidu account unlock all Baidu services?',
        answer:
          'No. Services can apply separate identity, business, payment, region, or developer requirements.',
      },
      {
        question: 'Is a Chinese phone number always required?',
        answer:
          'It depends on the current registration route and service. Check the official flow for the product you need.',
      },
    ],
  }),
  article({
    slug: 'bilibili-account-guide',
    title: 'Bilibili Account Guide for Viewers and Creators',
    seoTitle: 'Bilibili Account Guide: Signup and Creating',
    description:
      'Learn about Bilibili signup, community membership, creator verification, copyright, monetization, live streaming, and account safety.',
    tags: ['bilibili', 'video', 'creator'],
    featured: true,
    publishedAt: '2026-08-12T00:00:00Z',
    products: ['bilibili-accounts'],
    related: ['bilibili-vs-other-video-platforms', 'douyin-account-guide'],
    body: [
      p(
        'Bilibili is a Chinese video and community platform known for animation, games, technology, education, culture, and highly engaged interest communities. Basic viewing, full community participation, publishing, live streaming, monetization, and business tools can have different account and verification requirements.',
      ),
      h('Account and creator layers'),
      table(
        ['Use', 'What it enables', 'Possible requirements'],
        [
          ['Registered viewer', 'Follow, save, comment, and interact', 'Phone and security checks'],
          [
            'Community member',
            'Broader community functions under current rules',
            'Platform membership process may apply',
          ],
          [
            'Creator',
            'Upload and manage original video',
            'Identity, copyright, and content review',
          ],
          [
            'Live/monetization',
            'Live streaming or revenue features',
            'Additional age, identity, region, and program eligibility',
          ],
        ],
      ),
      h('Content fit'),
      p(
        'Bilibili often rewards depth, series, subject expertise, and community understanding. Tutorials, explainers, reviews, animation, gaming, and longer narratives can fit well. Creators should study the expectations of the specific content partition rather than treating the site as a generic video feed.',
      ),
      h('Copyright and community rules'),
      list([
        'Upload media you created or have permission to use',
        'Check music, footage, game, anime, and translation rights',
        'Use accurate titles and thumbnails',
        'Do not manufacture views, comments, or favorites',
        'Understand rules for sponsorships and regulated claims',
        'Keep source project files and licenses',
      ]),
      h('Account security'),
      p(
        'Protect the linked phone and password, review unfamiliar logins, and never approve a QR login you did not initiate. Creator accounts should also protect source files, monetization details, and team permissions.',
      ),
      links('Compare video strategies', [
        {
          label: 'Bilibili vs Douyin',
          href: path('comparisons', 'bilibili-vs-other-video-platforms'),
        },
        { label: 'Douyin account guide', href: path('guides', 'douyin-account-guide') },
      ]),
    ],
    faqs: [
      {
        question: 'Is Bilibili only for anime?',
        answer:
          'No. Anime remains important, but Bilibili also has large communities around games, technology, education, lifestyle, documentaries, and many other subjects.',
      },
      {
        question: 'Can every account monetize videos?',
        answer:
          'No. Monetization and live features have separate program, identity, content, and regional requirements.',
      },
    ],
  }),
  article({
    slug: 'bilibili-vs-other-video-platforms',
    title: 'Bilibili vs Douyin: Which Video Platform Fits?',
    seoTitle: 'Bilibili vs Douyin: Creator Platform Comparison',
    description:
      'Compare Bilibili and Douyin by video format, audience behavior, discovery, community, commerce, and creator strategy.',
    category: 'comparisons',
    tags: ['bilibili', 'douyin', 'comparison'],
    publishedAt: '2026-05-30T00:00:00Z',
    products: ['bilibili-accounts', 'douyin-accounts'],
    related: ['bilibili-account-guide', 'douyin-account-guide'],
    body: [
      p(
        'Choose Bilibili when the subject benefits from depth, community identity, series, and longer viewing. Choose Douyin when short-form discovery, rapid creative testing, live content, local services, or its commerce ecosystem is central. Many creators use both, but each version should be designed for the platform.',
      ),
      table(
        ['Area', 'Bilibili', 'Douyin'],
        [
          [
            'Typical format',
            'Short to long video, series, live, community discussion',
            'Short vertical video, live, search, and commerce',
          ],
          [
            'Audience behavior',
            'Interest communities and deeper viewing',
            'Fast recommendation-led discovery',
          ],
          [
            'Creator strength',
            'Expertise, fandom, education, narrative depth',
            'Hooks, concise entertainment, trends, conversion',
          ],
          [
            'Commerce',
            'Creator and advertising programs',
            'Extensive shop, affiliate, live, and local-service ecosystem',
          ],
          [
            'Best strategy',
            'Build authority and community over time',
            'Test creative and match high-intent discovery moments',
          ],
        ],
      ),
      h('Repurpose the idea, not the file'),
      p(
        'A Bilibili explainer can become several Douyin clips, while a successful Douyin question can inspire a deeper Bilibili video. Re-edit the opening, aspect ratio, pacing, captions, title, thumbnail, and call to action. Confirm music and footage rights on both platforms.',
      ),
      links('Platform setup guides', [
        { label: 'Bilibili account guide', href: path('guides', 'bilibili-account-guide') },
        { label: 'Douyin account guide', href: path('guides', 'douyin-account-guide') },
      ]),
    ],
    faqs: [
      {
        question: 'Is Bilibili better than Douyin?',
        answer:
          'Neither is universally better. The answer depends on audience, content depth, production style, and business goal.',
      },
      {
        question: 'Should creators publish on both?',
        answer:
          'Only if they can adapt content and manage both communities consistently. A focused presence can be better than weak duplication.',
      },
    ],
  }),
  article({
    slug: 'chinese-phone-number-guide',
    title: 'Chinese Phone Number Guide for Online Accounts',
    seoTitle: 'Chinese Phone Number Guide: +86 SIMs and SMS',
    description:
      'Understand +86 mobile numbers, real-name registration, roaming, account recovery, virtual-number risks, and when Chinese apps accept international numbers.',
    tags: ['chinese phone number', 'china sim', 'sms verification'],
    featured: true,
    publishedAt: '2026-08-12T00:00:00Z',
    products: ['chinese-phone-numbers', 'chinese-verification'],
    related: [
      'how-to-receive-sms-verification-china',
      'wechat-phone-number-requirements',
      'chinese-email-account-guide',
    ],
    body: [
      p(
        'A mainland Chinese mobile number uses the +86 country code and is normally issued under real-name registration rules. It can be necessary for some domestic services, but many platforms also support selected international numbers. Check the specific service before obtaining a number.',
      ),
      h('Choose based on long-term control'),
      table(
        ['Option', 'Good for', 'Main limitation'],
        [
          [
            'Your own compliant +86 SIM/eSIM where available',
            'Long-term China use',
            'Eligibility, real-name registration, plan, and roaming rules',
          ],
          [
            'Your existing international mobile',
            'Services that support its country code',
            'SMS delivery and feature availability vary',
          ],
          [
            'Business-managed number',
            'Authorized team workflows',
            'Ownership, employee access, and recovery need governance',
          ],
          [
            'Virtual or disposable number',
            'Rare low-risk tests only',
            'May be blocked, recycled, or unavailable for recovery',
          ],
        ],
      ),
      h('Questions to answer before obtaining a number'),
      list([
        'Who is the legal subscriber?',
        'Can the number receive application SMS and calls in your location?',
        'How is the plan renewed and when is it cancelled?',
        'Can you retain the number after changing providers or leaving China?',
        'Who controls the carrier account and recovery credentials?',
        'Which platform specifically requires +86 rather than an international number?',
      ]),
      h('Account recovery is the hidden requirement'),
      p(
        'A number used today may be requested months later for a new-device login or risk review. Public SMS sites, rentals, and numbers controlled by a seller can leave the real account owner unable to recover access. Update linked accounts before cancelling a SIM.',
      ),
      h('Compliance and privacy'),
      p(
        'Do not register a SIM under another person’s identity or use a number without authorization. Store subscriber documents securely, limit team access, and understand that the phone number can become a key to multiple online accounts.',
      ),
      links('Use the number safely', [
        {
          label: 'Receive Chinese platform SMS codes',
          href: path('tutorials', 'how-to-receive-sms-verification-china'),
        },
        {
          label: 'WeChat phone requirements',
          href: path('faq', 'wechat-phone-number-requirements'),
        },
      ]),
    ],
    faqs: [
      {
        question: 'Do I need a Chinese number for every Chinese app?',
        answer: 'No. Support varies by platform, feature, region, and time.',
      },
      {
        question: 'Can I use a rented number permanently?',
        answer:
          'It is high risk because the provider may retain control, recycle it, or be unable to supply future recovery codes.',
      },
    ],
  }),
  article({
    slug: 'chinese-email-account-guide',
    title: 'Chinese Email Account Guide: QQ, NetEase, and More',
    seoTitle: 'Chinese Email Account Guide: Providers and Setup',
    description:
      'Compare common Chinese email options, registration requirements, deliverability, recovery, aliases, and safer account management.',
    tags: ['chinese email', 'qq mail', 'netease mail'],
    featured: true,
    publishedAt: '2026-08-13T00:00:00Z',
    products: ['chinese-email-accounts', 'qq-accounts'],
    related: ['qq-account-guide', 'chinese-phone-number-guide'],
    body: [
      p(
        'A “Chinese email account” usually means an address from a China-based provider such as QQ Mail or a NetEase mail service. Choose one because a recipient, platform, or audience benefits from it—not because a Chinese domain automatically guarantees delivery or account approval.',
      ),
      h('Common provider considerations'),
      table(
        ['Option', 'Strength', 'Check carefully'],
        [
          [
            'QQ Mail',
            'Connected to the QQ ecosystem and widely recognized',
            'QQ registration, recovery, and service availability',
          ],
          [
            'NetEase mail services',
            'Established consumer and business email options',
            'Phone support, account type, and current registration route',
          ],
          [
            'Business email on your domain',
            'Organization ownership and professional identity',
            'Domain control, provider compliance, DNS, security, and administration',
          ],
          [
            'International provider',
            'May already be secure and familiar',
            'Whether the target Chinese service or recipient accepts it reliably',
          ],
        ],
      ),
      h('Registration and recovery'),
      list([
        'Use the official provider site or app',
        'Link a phone number and recovery method you control',
        'Use a unique password',
        'Record the exact address and account ID',
        'Enable available security alerts and login review',
        'Test sending and receiving before using it for a critical signup',
      ]),
      h('Deliverability is not guaranteed by the domain'),
      p(
        'Delivery depends on sender reputation, authentication, content, recipient filtering, and provider policy. For business domains, configure SPF, DKIM, and DMARC through the mail provider and monitor bounces. Do not send unsolicited bulk email.',
      ),
      h('Team ownership'),
      p(
        'Business mailboxes should be controlled by the organization, not tied permanently to one employee’s personal phone. Define administrator access, recovery, retention, offboarding, and how shared addresses are used.',
      ),
      callout(
        'Avoid pre-owned inboxes',
        'An inbox whose original owner retains recovery access is not secure. Existing messages and account links can also create privacy and ownership problems.',
      ),
      links('Related account guides', [
        { label: 'QQ account and QQ Mail guide', href: path('guides', 'qq-account-guide') },
        { label: 'Chinese phone number guide', href: path('guides', 'chinese-phone-number-guide') },
      ]),
    ],
    faqs: [
      {
        question: 'Do I need a Chinese email address for Chinese platforms?',
        answer:
          'Usually not universally. Some services prefer phone registration, while others accept many email providers. Check the specific platform.',
      },
      {
        question: 'Is QQ Mail separate from QQ?',
        answer: 'QQ Mail is part of the QQ ecosystem and commonly uses the QQ account identity.',
      },
    ],
  }),
  article({
    slug: 'chinese-platform-verification-guide',
    title: 'Chinese Platform Verification: A Practical Guide for International Users',
    seoTitle: 'Chinese Platform Verification Guide for International Users',
    description:
      'Understand SMS, identity, QR, payment, and business verification across Chinese platforms—and choose a safer path without sharing sensitive credentials.',
    tags: ['chinese verification', 'sms verification', 'identity verification', 'wechat', 'alipay'],
    featured: true,
    publishedAt: '2026-08-14T00:00:00Z',
    products: ['chinese-verification', 'chinese-phone-numbers', 'account-assistance'],
    related: [
      'wechat-registration-china-guide',
      'wechat-qr-verification-guide',
      'why-buy-verified-alipay-account',
      'chinese-phone-number-guide',
      'wechat-registration-failed',
    ],
    body: [
      p(
        'Chinese platform verification is not one universal process. A service may ask for an SMS code to prove control of a phone number, a QR scan to confirm a new registration, identity information for regulated features, or business documents for organization tools. The correct preparation depends on the platform, feature, country, account history, and the information you can legitimately provide.',
      ),
      callout(
        'The safest rule',
        'Use an account and phone number you control, provide accurate information, and keep passwords, SMS codes, payment PINs, and identity documents private. No legitimate helper can guarantee that a platform will approve a verification request.',
      ),
      h('The main types of verification'),
      table(
        ['Verification type', 'What it proves', 'Common examples'],
        [
          [
            'SMS verification',
            'You can receive a code on the linked number',
            'Registration, login, password reset',
          ],
          [
            'QR or assisted verification',
            'An eligible existing user or trusted device confirms an action',
            'WeChat registration or security review',
          ],
          [
            'Identity verification',
            'The account is connected to a real person or authorized identity',
            'Payments, real-name features, regulated services',
          ],
          [
            'Payment verification',
            'A supported card, bank account, or wallet method can be used',
            'Alipay payments, refunds, limits',
          ],
          [
            'Business verification',
            'An organization and its representative meet platform requirements',
            'WeCom, advertising, stores, APIs',
          ],
        ],
      ),
      h('Why verification requirements differ'),
      p(
        'Platforms use different checks for different levels of risk. A person who only wants to browse content may face a simple sign-up flow, while someone sending payments, opening a shop, publishing at scale, or managing customer data can face stronger checks. A successful basic registration therefore does not mean that every feature is available.',
      ),
      h('SMS verification: what to prepare'),
      list([
        'Use a normal mobile number that you control and can keep active.',
        'Confirm the country code and number format before requesting a code.',
        'Check that the SIM can receive application messages, not only ordinary texts.',
        'Avoid requesting many codes in a short period; carrier and platform limits may apply.',
        'Keep the number available after registration because it may be needed for recovery.',
      ]),
      p(
        'A mainland Chinese number is not automatically required for every Chinese platform. Many services support selected international country codes, while particular features or domestic workflows may require +86. Check the specific platform rather than buying a number first. A disposable or rented number is especially risky for an account you need to retain.',
      ),
      h('QR and friend verification'),
      p(
        'Some platforms ask an existing user to scan a QR code or confirm a registration. This is an anti-abuse measure, not a substitute for ownership or identity verification. The helper must satisfy the conditions shown in the official app, and those conditions can include account age, standing, region, or recent verification activity.',
      ),
      list(
        [
          'Start the process inside the official app and read the exact instruction shown.',
          'Use a current QR request; old codes can expire.',
          'Keep the applicant account on the applicant’s own device.',
          'The helper should scan or confirm only the displayed request.',
          'Stop if anyone asks for a password, SMS code, payment PIN, or remote-control access.',
        ],
        true,
      ),
      h('Identity verification and document safety'),
      p(
        'Identity checks should use the real account owner’s information and the document types accepted by that service. Names, dates, country, and payment details may need to match. Do not submit another person’s identity, buy a “verified identity,” or assume that a transferred account can be safely changed later. Mismatched ownership can block recovery and create compliance problems.',
      ),
      callout(
        'Document privacy',
        'Only submit documents through the platform’s official verification screen or a clearly authorized business process. Avoid sending full identity documents through informal chat unless there is a documented, necessary reason and a secure handling process.',
      ),
      h('Payment and Alipay verification'),
      p(
        'Alipay may support different features for international visitors, mainland users, and merchants. Adding a foreign card does not necessarily unlock every wallet, transfer, refund, red-packet, or business feature. Merchant acceptance and settlement require separate onboarding. Before relying on Alipay, check the current country, card, transaction, fee, and limit information shown in the official app.',
      ),
      h('Business and organization verification'),
      p(
        'WeCom, advertising tools, stores, APIs, and other business products can require an organization, representative, business license, billing details, or category approval. A personal account is not a replacement for a business account. Teams should also decide who owns the phone number, recovery email, administrator access, customer contacts, and payment credentials before completing setup.',
      ),
      h('A safer troubleshooting sequence'),
      list(
        [
          'Capture the exact error message without exposing private codes or documents.',
          'Identify whether the problem is SMS delivery, helper eligibility, identity mismatch, payment support, or a temporary risk limit.',
          'Confirm the app, website, country code, device, and network are appropriate for the service.',
          'Stop repeated attempts if the platform mentions unusual activity or a temporary restriction.',
          'Use the official help center, security center, or appeal flow offered by the platform.',
          'Only then consider professional account assistance, and ask what the service can actually do before sharing information.',
        ],
        true,
      ),
      h('How to evaluate a verification service'),
      list([
        'It explains the exact step it supports instead of promising a guaranteed outcome.',
        'It never requests your password, SMS code, payment PIN, or unnecessary remote access.',
        'It states whether identity documents are needed and how they are handled.',
        'It distinguishes platform rules from its own assistance.',
        'It provides a clear price, scope, limitations, and next step before you commit.',
        'It does not claim to bypass risk controls, identity requirements, or regional restrictions.',
      ]),
      h('Platform-by-platform starting points'),
      table(
        ['Goal', 'Start here', 'Related Surjora guide'],
        [
          [
            'Register WeChat',
            'SMS and possibly assisted verification',
            'WeChat registration guide',
          ],
          [
            'Complete a WeChat QR check',
            'Official QR or friend-verification screen',
            'WeChat QR verification guide',
          ],
          [
            'Use Alipay payments',
            'Account, identity, card, and feature eligibility',
            'Alipay verification guide',
          ],
          [
            'Get a +86 number',
            'Confirm that the target feature actually requires one',
            'Chinese phone number guide',
          ],
          [
            'Fix a failed signup',
            'Read the exact error and pause repeated attempts',
            'WeChat registration troubleshooting',
          ],
        ],
      ),
      h('Final checklist'),
      list([
        'I know which platform feature I am trying to unlock.',
        'I control the linked phone number and recovery method.',
        'My identity and business information is accurate.',
        'I understand whether the check is SMS, QR, identity, payment, or business verification.',
        'I will not share passwords, codes, payment PINs, or unnecessary documents.',
        'I know the official support or appeal route if the first attempt fails.',
      ]),
      links('Continue with the relevant guide', [
        {
          label: 'Complete WeChat registration guide',
          href: path('guides', 'wechat-registration-china-guide'),
        },
        {
          label: 'WeChat QR verification guide',
          href: path('guides', 'wechat-qr-verification-guide'),
        },
        {
          label: 'Alipay verification explained',
          href: path('guides', 'why-buy-verified-alipay-account'),
        },
        { label: 'Chinese phone number guide', href: path('guides', 'chinese-phone-number-guide') },
      ]),
    ],
    faqs: [
      {
        question: 'Can a verification service guarantee approval?',
        answer:
          'No. The platform controls eligibility and approval. A legitimate service can explain or assist with an allowed step, but cannot guarantee the result or bypass platform controls.',
      },
      {
        question: 'Should I share my SMS code with support?',
        answer:
          'No. Treat SMS login, reset, and payment codes as private secrets. Use them only in the official app or site where you initiated the action.',
      },
      {
        question: 'Do I always need a Chinese phone number?',
        answer:
          'No. Requirements vary by platform, country, account type, and feature. Check the target service before obtaining a number.',
      },
      {
        question: 'What should I do after verification succeeds?',
        answer:
          'Secure the account, keep the linked number active, review devices and recovery options, and read the limits for the feature you enabled.',
      },
    ],
  }),
];
