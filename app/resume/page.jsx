export const metadata = {
  title: "Resume",
  description: "Arnav Choudhury's resume.",
  alternates: { canonical: "/resume/" },
};

export default function ResumePage() {
  return (
    <main>
      <iframe
        title="Arnav Choudhury resume"
        src="/resume.pdf"
        style={{ width: "100%", height: "100vh", display: "block" }}
      />
    </main>
  );
}
