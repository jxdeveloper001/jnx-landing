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
      ? 'h-[52px] sm:h-[57px] md:h-[63px]'
      : 'h-10 sm:h-11 md:h-12';

  return (
    <span className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/images/jnx-logo.png"
        alt="JNX"
        width="142"
        height="70"
        decoding="async"
        className={`${sizeClasses} w-auto object-contain transition-all duration-200 ${
          light ? 'brightness-0 invert' : ''
        }`}
      />
    </span>
  );
}
