export default function Logo({
  light = false,
  className = '',
  size = 'default',
}: {
  light?: boolean;
  className?: string;
  size?: 'default' | 'header' | 'footer';
}) {
  const sizeClasses =
    size === 'header'
      ? 'h-[47px] sm:h-[52px] md:h-[57px]'
      : 'h-10 sm:h-11 md:h-12';

  return (
    <span className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/images/jnx-logo.png"
        alt="JNX"
        width="142"
        height="70"
        className={`${sizeClasses} w-auto object-contain transition-all duration-200 ${
          light ? 'brightness-0 invert' : ''
        }`}
      />
    </span>
  );
}
