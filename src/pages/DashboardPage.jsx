import { Link } from 'react-router-dom';

const DashboardPage = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-6 md:p-8 text-center">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary mb-3">Dashboard</h1>
        <p className="text-white/70 mb-6">Welcome to your Archon portal.</p>
        <Link
          to="/"
          className="inline-flex rounded-md border-2 border-primary px-5 py-2 text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary hover:text-black transition-all"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default DashboardPage;
