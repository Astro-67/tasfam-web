'use client';

import { useState, FormEvent } from 'react';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
      const res = await fetch(`${strapiUrl}/api/contact-submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(
          body?.error?.message || 'Failed to send message. Please try again.'
        );
      }

      setSuccess(true);
      e.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form-box">
      <h3>Send Us a Message</h3>
      <p>Fill out the form below and we&apos;ll get back to you as soon as possible.</p>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">
              Your Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="email" className="form-label">
              Your Email <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="subject" className="form-label">
              Subject <span className="text-danger">*</span>
            </label>
            <select className="form-select" id="subject" name="subject" required defaultValue="">
              <option value="" disabled>
                Select a subject
              </option>
              <option value="general">General Inquiry</option>
              <option value="project">Project Information</option>
              <option value="partnership">Partnership Opportunity</option>
              <option value="research">Research Collaboration</option>
              <option value="media">Media Inquiry</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="col-12">
            <label htmlFor="organization" className="form-label">
              Organization/Institution
            </label>
            <input
              type="text"
              className="form-control"
              id="organization"
              name="organization"
              placeholder="Enter your organization name (optional)"
            />
          </div>

          <div className="col-12">
            <label htmlFor="message" className="form-label">
              Message <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control"
              id="message"
              name="message"
              rows={6}
              placeholder="Type your message here..."
              required
            ></textarea>
          </div>

          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="consent"
                name="consent"
                required
              />
              <label className="form-check-label" htmlFor="consent">
                I agree to the processing of my personal data for the purpose of handling my
                inquiry. <span className="text-danger">*</span>
              </label>
            </div>
          </div>

          <div className="col-12">
            {loading && <div className="loading">Sending message...</div>}
            {error && <div className="error-message">{error}</div>}
            {success && (
              <div className="sent-message">
                Your message has been sent successfully. We will get back to you soon. Thank you!
              </div>
            )}
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              <i className="bi bi-send"></i> Send Message
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
