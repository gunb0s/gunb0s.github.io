import { SiGithub, SiLinkedin } from "react-icons/si";

export default function MinimallistHeader() {
  return (
    <header className="max-w-2xl mx-auto px-6 pt-16 pb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-medium text-foreground mb-2">
            Tech Research Blog
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Notes on open source projects and research papers
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/gunb0s"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <SiGithub className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/bsk823"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <SiLinkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </header>
  );
}
