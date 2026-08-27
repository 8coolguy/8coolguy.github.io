const links = [
  ["Throw Shader", "/throwShader/"],
  ["Gallery", "/gallery/"],
  ["Resume", "/resume/"],
  ["Blog", "/blog/"],
  ["Contact", "mailto:arnavc02@gmail.com"],
];

export default function Footer() {
  return (
    <footer className="bottom-0 left-0 z-20 w-full p-4 md:flex md:items-center md:justify-between md:p-6">
      <span className="text-sm text-gray-500 sm:text-center">
        {new Date().getFullYear()} <a href="/" className="hover:underline">8coolguy</a>. All Rights Reserved.
      </span>
      <nav aria-label="Footer navigation">
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
          {links.map(([label, href]) => (
            <li key={label}>
              <a href={href} className="hover:underline me-4 md:me-6">{label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
