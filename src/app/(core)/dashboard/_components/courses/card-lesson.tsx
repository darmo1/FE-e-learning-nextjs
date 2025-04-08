import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LessonsProps } from "../../course/[id]/page";
import { Conditional } from "@/components/common/conditional";

export const CardLesson = ({ lessons }: { lessons: LessonsProps[] }) => {
  return (
    <Conditional test={!!lessons.length} fallback={<div>No existen lesiones aún</div>}>
      <Card>
        <CardHeader>
          <CardTitle>Tus Videos</CardTitle>
          <CardDescription>
            Administra tus videos subidos y revisa su rendimiento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {lessons.map(({ course_id, id, is_free, title, video_url }) => (
              <div
                key={id}
                className="grid grid-cols-1 gap-4 rounded-lg border p-4 md:grid-cols-[200px_1fr]"
              >
                <div className="relative aspect-video overflow-hidden rounded-md bg-muted w-1/2">
                  <video
                    controls
                    className="h-full w-full object-cover"
                  >
                    <source src={video_url} type="video/mp4" />
                    Tu navegador no soporta la reproducción de video.
                  </video>

                  {/* <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Play className="h-10 w-10 text-white" />
                </div> */}
                  {/* <div className="absolute bottom-2 right-2 rounded bg-black/70 px-1 text-xs text-white">
                  {video.duration}
                </div> */}
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{title}</h3>
                        {/* <p className="text-sm text-muted-foreground">
                        Subido el {video.date}
                      </p> */}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          {/* <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Acciones</span>
                      </Button> */}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Ver estadísticas</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  {/* <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge
                  variant={
                    video.status === "published" ? "default" : video.status === "draft" ? "outline" : "secondary"
                  }
                >
                  {video.status === "published" ? "Publicado" : video.status === "draft" ? "Borrador" : "Procesando"}
                </Badge>
                {video.status === "published" && (
                  <span className="text-xs text-muted-foreground">{video.views} visualizaciones</span>
                )}
              </div> */}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Conditional>
  );
};
