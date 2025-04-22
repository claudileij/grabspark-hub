import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, Cloud, LogOut, User, Settings, UploadCloud, LayoutDashboard } from "lucide-react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
            <div className="ml-4 flex items-center space-x-2">
              {user ? (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="flex items-center px-3 py-1 rounded bg-muted/40 mr-2 cursor-pointer hover:bg-muted/70 transition-colors">
                        <User className="w-4 h-4 mr-1 text-muted-foreground" />
                        <span className="text-sm font-medium truncate max-w-[120px]" title={user.username}>{user.username}</span>
                        <span className="mx-2 text-muted-foreground">|</span>
                        <span className="text-xs text-muted-foreground truncate max-w-[160px]" title={user.email}>{user.email}</span>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Configurações</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UploadCloud className="mr-2 h-4 w-4" />
                        <span>Upload</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sair</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
            <div className="pt-4 flex flex-col space-y-2">
              {user ? (
                <>
                  <div className="flex flex-col space-y-1 items-start mb-2 px-2">
                    <span className="flex items-center text-sm font-medium">
                      <User className="w-4 h-4 mr-1" /> {user.username}
                    </span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                  <Link 
                    to="/dashboard" 
                    className="flex items-center text-sm px-2 py-2 hover:bg-muted/50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                  <Link 
                    to="#" 
                    className="flex items-center text-sm px-2 py-2 hover:bg-muted/50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Configurações
                  </Link>
                  <Link 
                    to="#" 
                    className="flex items-center text-sm px-2 py-2 hover:bg-muted/50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UploadCloud className="w-4 h-4 mr-2" />
                    Upload
                  </Link>
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
