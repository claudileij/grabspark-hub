import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ShareLinkDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  fileName: string
  fileId: string
}

export function ShareLinkDialog({ 
  open, 
  onOpenChange, 
  fileName, 
  fileId 
}: ShareLinkDialogProps) {
  const [password, setPassword] = useState("")
  const [expiryDays, setExpiryDays] = useState("0")
  const [singleView, setSingleView] = useState(false)
  const [generatedLink, setGeneratedLink] = useState("")
  const { toast } = useToast()

  const generateShareLink = () => {
    // Mock implementation - in real app this would call API
    const baseUrl = window.location.origin
    const params = new URLSearchParams()
    
    if (password) params.set('p', btoa(password))
    if (expiryDays && expiryDays !== "0") params.set('exp', expiryDays)
    if (singleView) params.set('single', '1')
    
    const link = `${baseUrl}/share/${fileId}${params.toString() ? '?' + params.toString() : ''}`
    setGeneratedLink(link)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink)
      toast({
        title: "Link copiado!",
        description: "O link foi copiado para sua área de transferência.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao copiar",
        description: "Não foi possível copiar o link.",
      })
    }
  }

  const resetDialog = () => {
    setPassword("")
    setExpiryDays("0")
    setSingleView(false)
    setGeneratedLink("")
  }

  return (
    <Dialog open={open} onOpenChange={(open) => {
      onOpenChange(open)
      if (!open) resetDialog()
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Compartilhar Arquivo</DialogTitle>
          <DialogDescription>
            Configure as opções de compartilhamento para: <span className="font-medium">{fileName}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Senha (Opcional)</Label>
            <Input
              id="password"
              type="password"
              placeholder="Digite uma senha..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="expiry">Tempo para expirar (Em dias)</Label>
            <Input
              id="expiry"
              type="number"
              placeholder="0 para nunca"
              min="0"
              max="365"
              value={expiryDays}
              onChange={(e) => setExpiryDays(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">0 = nunca expira</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="single-view" 
              checked={singleView}
              onCheckedChange={(checked) => setSingleView(checked as boolean)}
            />
            <Label 
              htmlFor="single-view" 
              className="text-sm font-normal cursor-pointer"
            >
              Visualização única (link expira após 1 acesso)
            </Label>
          </div>
          
          {generatedLink && (
            <div className="space-y-2">
              <Label>Link de compartilhamento</Label>
              <div className="flex space-x-2">
                <Input
                  value={generatedLink}
                  readOnly
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={copyToClipboard}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          {!generatedLink ? (
            <Button onClick={generateShareLink}>
              Gerar Link
            </Button>
          ) : (
            <Button onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}