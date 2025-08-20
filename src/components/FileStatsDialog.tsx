import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Download, Calendar, FileText } from "lucide-react"

interface FileStatsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  fileName: string
  fileId: string
}

export function FileStatsDialog({ 
  open, 
  onOpenChange, 
  fileName 
}: FileStatsDialogProps) {
  // Mock data - in real app this would come from API
  const stats = {
    views: 127,
    downloads: 43,
    lastAccessed: "2024-01-15T10:30:00Z",
    createdAt: "2024-01-10T14:20:00Z"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Estatísticas do Arquivo</DialogTitle>
          <DialogDescription>
            Estatísticas de acesso para: <span className="font-medium">{fileName}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.views}</div>
              <p className="text-xs text-muted-foreground">
                Total de visualizações
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Downloads</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.downloads}</div>
              <p className="text-xs text-muted-foreground">
                Total de downloads
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-3 mt-4">
          <div className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg">
            <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">Último acesso</p>
              <p className="text-xs text-muted-foreground">
                {formatDate(stats.lastAccessed)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg">
            <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">Criado em</p>
              <p className="text-xs text-muted-foreground">
                {formatDate(stats.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}