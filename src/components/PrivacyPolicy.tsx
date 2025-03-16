import React, { useState } from 'react';
import './PrivacyPolicy.scss'; // Make sure to create this SCSS file

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const policyDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="privacy-policy">
      <div className="privacy-policy__header">
        <h1>Privacy Policy</h1>
        <p className="update-date">Last Updated: {policyDate}</p>
      </div>

      <div className="privacy-policy__content">
        <p className="intro-text">
          At <span className="company-name">YourDesignAgency</span>, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
        </p>

        <div className="privacy-sections">
          {/* Section 1 */}
          <div className="section">
            <button 
              onClick={() => toggleSection('information')} 
              className="section-toggle"
            >
              <span>1. Information We Collect</span>
              <span className="toggle-icon">{activeSection === 'information' ? '−' : '+'}</span>
            </button>
            {activeSection === 'information' && (
              <div className="section-content">
                <h3>Personal Information</h3>
                <p>We may collect personal information that you voluntarily provide to us when you:</p>
                <ul>
                  <li>Register on our website</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Request a quote or consultation</li>
                  <li>Submit a contact form</li>
                  <li>Engage with us on social media</li>
                </ul>
                
                <h3>Information Automatically Collected</h3>
                <p>When you visit our website, we may automatically collect certain information about your device, including:</p>
                <ul>
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Operating system</li>
                  <li>Referring URLs</li>
                  <li>Time spent on pages</li>
                  <li>Clickstream data</li>
                </ul>
              </div>
            )}
          </div>

          {/* Section 2 */}
          <div className="section">
            <button 
              onClick={() => toggleSection('usage')} 
              className="section-toggle"
            >
              <span>2. How We Use Your Information</span>
              <span className="toggle-icon">{activeSection === 'usage' ? '−' : '+'}</span>
            </button>
            {activeSection === 'usage' && (
              <div className="section-content">
                <p>We use the information we collect for various purposes, including to:</p>
                <ul>
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process and complete transactions</li>
                  <li>Send you marketing communications</li>
                  <li>Respond to your comments, questions, and requests</li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                  <li>Personalize your experience</li>
                  <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                </ul>
              </div>
            )}
          </div>

          {/* Section 3 */}
          <div className="section">
            <button 
              onClick={() => toggleSection('sharing')} 
              className="section-toggle"
            >
              <span>3. Information Sharing and Disclosure</span>
              <span className="toggle-icon">{activeSection === 'sharing' ? '−' : '+'}</span>
            </button>
            {activeSection === 'sharing' && (
              <div className="section-content">
                <p>We may share your information with:</p>
                <ul>
                  <li>Service providers who perform services on our behalf</li>
                  <li>Professional advisors, such as lawyers and accountants</li>
                  <li>Business partners with whom we jointly offer products or services</li>
                  <li>Regulatory authorities, law enforcement, and other third parties as required by law</li>
                </ul>
                
                <p>We do not sell, rent, or trade your personal information with third parties for their commercial purposes.</p>
              </div>
            )}
          </div>

          {/* Section 4 */}
          <div className="section">
            <button 
              onClick={() => toggleSection('cookies')} 
              className="section-toggle"
            >
              <span>4. Cookies and Tracking Technologies</span>
              <span className="toggle-icon">{activeSection === 'cookies' ? '−' : '+'}</span>
            </button>
            {activeSection === 'cookies' && (
              <div className="section-content">
                <p>We use cookies and similar tracking technologies to collect information about your browsing activities and to better understand how you use our website.</p>
                
                <h3>Types of Cookies We Use:</h3>
                <ul>
                  <li><strong>Essential cookies:</strong> Necessary for the website to function properly</li>
                  <li><strong>Functionality cookies:</strong> Remember your preferences and settings</li>
                  <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website</li>
                  <li><strong>Marketing cookies:</strong> Track your browsing habits to enable targeted advertising</li>
                </ul>
                
                <p>You can control cookies through your browser settings. However, disabling cookies may limit your ability to use certain features of our website.</p>
              </div>
            )}
          </div>

          {/* Section 5 */}
          <div className="section">
            <button 
              onClick={() => toggleSection('security')} 
              className="section-toggle"
            >
              <span>5. Data Security</span>
              <span className="toggle-icon">{activeSection === 'security' ? '−' : '+'}</span>
            </button>
            {activeSection === 'security' && (
              <div className="section-content">
                <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.</p>
                
                <p>However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>
              </div>
            )}
          </div>

          {/* Section 6 */}
          <div className="section">
            <button 
              onClick={() => toggleSection('rights')} 
              className="section-toggle"
            >
              <span>6. Your Rights</span>
              <span className="toggle-icon">{activeSection === 'rights' ? '−' : '+'}</span>
            </button>
            {activeSection === 'rights' && (
              <div className="section-content">
                <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
                <ul>
                  <li>The right to access your personal information</li>
                  <li>The right to rectify inaccurate or incomplete information</li>
                  <li>The right to erasure of your personal information</li>
                  <li>The right to restrict or object to processing</li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent</li>
                </ul>
                
                <p>To exercise these rights, please contact us using the information provided in the "Contact Us" section.</p>
              </div>
            )}
          </div>

          {/* Section 7 */}
          <div className="section">
            <button 
              onClick={() => toggleSection('children')} 
              className="section-toggle"
            >
              <span>7. Children's Privacy</span>
              <span className="toggle-icon">{activeSection === 'children' ? '−' : '+'}</span>
            </button>
            {activeSection === 'children' && (
              <div className="section-content">
                <p>Our services are not intended for individuals under the age of 16. We do not knowingly collect personal information from children under 16. If we become aware that we have collected personal information from a child under 16 without verification of parental consent, we will take steps to remove that information from our servers.</p>
              </div>
            )}
          </div>

          {/* Section 8 */}
          <div className="section">
            <button 
              onClick={() => toggleSection('changes')} 
              className="section-toggle"
            >
              <span>8. Changes to This Privacy Policy</span>
              <span className="toggle-icon">{activeSection === 'changes' ? '−' : '+'}</span>
            </button>
            {activeSection === 'changes' && (
              <div className="section-content">
                <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top.</p>
                
                <p>We encourage you to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
              </div>
            )}
          </div>

          {/* Section 9 */}
          <div className="section">
            <button 
              onClick={() => toggleSection('contact')} 
              className="section-toggle"
            >
              <span>9. Contact Us</span>
              <span className="toggle-icon">{activeSection === 'contact' ? '−' : '+'}</span>
            </button>
            {activeSection === 'contact' && (
              <div className="section-content">
                <p>If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at:</p>
                
                <div className="contact-info">
                  <p className="company-name">YourDesignAgency</p>
                  <p>123 Design Street</p>
                  <p>Creativeville, CA 90210</p>
                  <p>privacy@yourdesignagency.com</p>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;