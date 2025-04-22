
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, Cloud, LogOut, User } from "lucide-react";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = useCurrentUser();

  const isActive = (path: string) => location.pathname === path;

  function handleLogout() {
    localStorage.removeItem("auth_token");
    // Redireciona pro home e força reload do estado de auth
    navigate("/");
    setTimeout(() => window.location.reload(), 100);
  }

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
            <Link 
              to="/" 
              className={`transition-colors ${isActive('/') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
            >
              Início
            </Link>
            <Link 
              to="/resources" 
              className={`transition-colors ${isActive('/resources') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
            >
              Recursos
            </Link>
            <Link 
              to="/pricing" 
              className={`transition-colors ${isActive('/pricing') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
            >
              Preços
            </Link>
            <Link 
              to="/privacy" 
              className={`transition-colors ${isActive('/privacy') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
            >
              Privacidade
            </Link>
            <div className="ml-4 flex items-center space-x-2">
              {user ? (
                <>
                  <div className="flex items-center px-3 py-1 rounded bg-muted/40 mr-2">
                    <User className="w-4 h-4 mr-1 text-muted-foreground" />
                    <span className="text-sm font-medium truncate max-w-[120px]" title={user.username}>{user.username}</span>
                    <span className="mx-2 text-muted-foreground">|</span>
                    <span className="text-xs text-muted-foreground truncate max-w-[160px]" title={user.email}>{user.email}</span>
                  </div>
                  <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="ghost">
                    <Link to="/login">Entrar</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register">
                      Cadastrar
                      <LogIn className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </>
              )}
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
              className={`block py-2 transition-colors ${isActive('/') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              to="/resources"
              className={`block py-2 transition-colors ${isActive('/resources') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Recursos
            </Link>
            <Link
              to="/pricing"
              className={`block py-2 transition-colors ${isActive('/pricing') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Preços
            </Link>
            <Link
              to="/privacy"
              className={`block py-2 transition-colors ${isActive('/privacy') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Privacidade
            </Link>
            <div className="pt-4 flex flex-col space-y-2">
              {user ? (
                <>
                  <div className="flex flex-col space-y-1 items-start mb-2 px-2">
                    <span className="flex items-center text-sm font-medium">
                      <User className="w-4 h-4 mr-1" /> {user.username}
                    </span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                  <Button variant="outline" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
