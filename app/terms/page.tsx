export default function TermsOfService() {
  return (
    <main className="container-max py-12">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Acceptance of Terms</h2>
        <p>
          By using our website and services, you agree to these Terms of
          Service. Please read them carefully.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Use of Services</h2>
        <p>
          You agree to use our services lawfully and not to misuse or attempt to
          disrupt our website or systems.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Intellectual Property</h2>
        <p>
          All content on this website is the property of Object Technologies or
          its licensors. You may not copy, distribute, or use content without
          permission.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Limitation of Liability</h2>
        <p>
          We strive to provide accurate information, but we do not guarantee
          completeness or reliability. We are not liable for any damages
          resulting from your use of our website.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
        <p>
          For questions about these terms, please email{" "}
          <a
            href="mailto:help.objecttechnologies@gmail.com"
            className="text-brand-orange underline"
          >
            help.objecttechnologies@gmail.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}
