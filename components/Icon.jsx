// Font Awesome definitions are just SVG data. Rendering them directly avoids
// shipping its general-purpose renderer and stylesheet to every visitor.
export default function Icon({ icon, size, className = "", ...props }) {
  const [width, height, , , paths] = icon.icon;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${width} ${height}`}
      width={`${width / height}em`}
      height="1em"
      className={`inline-icon ${size ? `inline-icon-${size}` : ""} ${className}`}
      {...props}
    >
      {(Array.isArray(paths) ? paths : [paths]).map((path, index) => (
        <path key={index} d={path} />
      ))}
    </svg>
  );
}
