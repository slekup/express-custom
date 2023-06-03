export default function Footer() {
  return (
    <div className="relative w-full bg-background border-y border-border py-5">
      <div className="max-w-5xl mx-auto w-11/12">
        <p className="text-center text-text-primary">
          Created with{' '}
          <a
            href="https://www.npmjs.com/package/express-custom"
            className="link"
            target="_blank"
          >
            Express Custom
          </a>
        </p>
      </div>
    </div>
  );
}
