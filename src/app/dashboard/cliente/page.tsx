"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Edit, Users } from "lucide-react"

const initialClients = Array.from({ length: 53 }, (_, i) => ({
  id: i + 1,
  name: `Cliente ${i + 1}`,
  email: `cliente${i + 1}@mail.com`,
}))

export default function ClientesPage() {
  const [clients, setClients] = useState(initialClients)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [showAdd, setShowAdd] = useState(false)
  const [editModal, setEditModal] = useState<{ open: boolean; id?: number }>({ open: false })
  const [editName, setEditName] = useState("")
  const [editEmail, setEditEmail] = useState("")

  const pageSize = 10
  const filtered = clients.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
  const totalPages = Math.ceil(filtered.length / pageSize)
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)

  const openEditModal = (id: number) => {
    const client = clients.find((c) => c.id === id)
    if (client) {
      setEditName(client.name)
      setEditEmail(client.email)
      setEditModal({ open: true, id })
    }
  }

  const handleEditSave = () => {
    setClients(clients.map((c) => (c.id === editModal.id ? { ...c, name: editName, email: editEmail } : c)))
    setEditModal({ open: false })
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <p className="text-muted-foreground">Gestiona tu base de clientes de manera eficiente</p>
        </div>
        <Badge variant="secondary" className="w-fit">
          <Users className="w-4 h-4 mr-1" />
          {filtered.length} cliente{filtered.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      {/* Search and Actions */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar cliente..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(1)
                }}
                className="pl-10"
              />
            </div>
            <Dialog open={showAdd} onOpenChange={setShowAdd}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Agregar Cliente
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agregar cliente</DialogTitle>
                  <DialogDescription>(Simulación, no agrega realmente)</DialogDescription>
                </DialogHeader>
                <Button onClick={() => setShowAdd(false)} className="w-full mt-4">
                  Cerrar
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-20 font-semibold">ID</TableHead>
                  <TableHead className="font-semibold">Nombre</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="w-32 text-center font-semibold">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((c) => (
                  <TableRow key={c.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium text-muted-foreground">
                      #{c.id.toString().padStart(3, "0")}
                    </TableCell>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell className="text-muted-foreground">{c.email}</TableCell>
                    <TableCell className="text-center">
                      <Dialog
                        open={editModal.open && editModal.id === c.id}
                        onOpenChange={(open) => (open ? openEditModal(c.id) : setEditModal({ open: false }))}
                      >
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="gap-2 hover:bg-primary/10">
                            <Edit className="w-4 h-4" />
                            Editar
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Editar cliente</DialogTitle>
                            <DialogDescription>Modifica la información del cliente seleccionado.</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Nombre
                              </label>
                              <Input
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                placeholder="Ingresa el nombre del cliente"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Email
                              </label>
                              <Input
                                value={editEmail}
                                onChange={(e) => setEditEmail(e.target.value)}
                                placeholder="Ingresa el email del cliente"
                                type="email"
                              />
                            </div>
                          </div>
                          <div className="flex gap-3 pt-4">
                            <Button onClick={handleEditSave} className="flex-1">
                              Guardar cambios
                            </Button>
                            <Button variant="outline" onClick={() => setEditModal({ open: false })} className="flex-1">
                              Cancelar
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
                {paginated.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="h-32 text-center">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Users className="w-8 h-8" />
                        <p className="text-sm">No se encontraron clientes</p>
                        {search && <p className="text-xs">Intenta con un término de búsqueda diferente</p>}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t bg-muted/20">
              <div className="text-sm text-muted-foreground">
                Mostrando {(page - 1) * pageSize + 1} a {Math.min(page * pageSize, filtered.length)} de{" "}
                {filtered.length} cliente{filtered.length !== 1 ? "s" : ""}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                  Anterior
                </Button>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground">
                    Página {page} de {totalPages}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
