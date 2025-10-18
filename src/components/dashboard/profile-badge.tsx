import { Conditional } from '../common/conditional'
import { Badge } from '../ui/badge'
export const ProfileBadge = ({ role }: { role?: string}) => {
  return (
    <Conditional test={!!role}>
      <div className='text-md text-center mt-8'><Badge variant={"destructive"}>{role}</Badge>  </div>
    </Conditional>
  )
}
