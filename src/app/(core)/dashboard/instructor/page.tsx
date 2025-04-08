import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { VideoList } from "@/components/video/video-list";
import { VideoUploader } from "@/components/video/video-uploader";
import { FormVideoWrapper } from "../_components/form-video";


export default function Page() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-8">
        <FormVideoWrapper>
          <VideoUploader />
          <VideoList />
        </FormVideoWrapper>
      </div>
    </DashboardShell>
  );
}
