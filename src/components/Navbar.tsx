
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, Cloud } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-background/90 backdrop-blur-md z-50 border-b border-border/40 shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
              <Cloud className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-foreground">Flux Storage</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Início
            </Link>
            <Link to="/features" className="text-foreground hover:text-primary transition-colors">
              Recursos
            </Link>
            <Link to="/pricing" className="text-foreground hover:text-primary transition-colors">
              Preços
            </Link>
            <Link to="/docs" className="text-foreground hover:text-primary transition-colors">
              Documentação
            </Link>
            <div className="ml-4 flex items-center space-x-2">
              <Button asChild variant="ghost">
                <Link to="/login">Entrar</Link>
              </Button>
              <Button asChild>
                <Link to="/register">
                  Cadastrar
                  <LogIn className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-md border-b border-border animate-fade-in">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link
              to="/"
              className="block py-2 text-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              to="/features"
              className="block py-2 text-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Recursos
            </Link>
            <Link
              to="/pricing"
              className="block py-2 text-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Preços
            </Link>
            <Link
              to="/docs"
              className="block py-2 text-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Documentação
            </Link>
            <div className="pt-4 flex flex-col space-y-2">
              <Button asChild variant="outline">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  Entrar
                </Link>
              </Button>
              <Button asChild>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  Cadastrar
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
