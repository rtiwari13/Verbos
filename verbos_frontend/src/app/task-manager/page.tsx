import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card"
import { Plus } from "lucide-react"

export default function BoardColumn() {
  return (
    <div className="">
       <div className="p-6 flex justify-between items-center border-b border-border">
        <h1 className="text-2xl font-bold tracking-tight">Board Title</h1>
        <Button size="sm">Add Board</Button>
      </div>
       <div className="w-80 bg-gradient-to-b from-violet-500 to-violet-400 text-foreground rounded-2xl p-4 flex flex-col gap-4 shadow-md">
      
      {/* Column Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold text-white">Done</h2>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Task Block */}
      <Card className="bg-card shadow-sm">
        <CardHeader className="flex flex-row justify-between items-center py-3">
          <CardTitle className="text-sm font-medium">Testing</CardTitle>
          <Button variant="ghost" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          <Card className="shadow-sm">
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-semibold">
                Initial bug fixes
              </CardTitle>
              <CardDescription className="text-xs">
                Resolved all critical bugs from the first round of testing.
              </CardDescription>
            </CardHeader>
          </Card>
        </CardContent>
      </Card>

      {/* Another Task Block */}
      <Card className="bg-card shadow-sm">
        <CardHeader className="flex flex-row justify-between items-center py-3">
          <CardTitle className="text-sm font-medium">New Task 10000</CardTitle>
          <Button variant="ghost" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <Card className="shadow-sm">
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-semibold">New Card 10003</CardTitle>
              <CardDescription className="text-xs">
                This is a new card description.
              </CardDescription>
            </CardHeader>
          </Card>
        </CardContent>
      </Card>

      {/* More tasks */}
    </div>
    </div>
   
  )
}



