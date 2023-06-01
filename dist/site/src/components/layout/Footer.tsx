export default function Footer() {
  return (
    <div className="relative w-full bg-default/50 shadow-inner border-y border-border py-5">
      <div className="max-w-5xl mx-auto w-11/12">
        <p className="text-center text-text-primary">
          Generated with{' '}
          <a
            href="https://www.npmjs.com/package/express-custom"
            className="link"
            target="_blank"
          >
            Express Custom
          </a>
          . {new Date().getFullYear()}.
        </p>
      </div>
    </div>
  );
}
