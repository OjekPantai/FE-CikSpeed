/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NewCustomerList = ({ users }) => {
  const sortedUsers = users.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Pelanggan Baru</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {sortedUsers.map((user) => (
            <div key={user.id} className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarFallback className="capitalize">
                  {user.username[0]}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm capitalize font-medium leading-none">
                  {user.username}
                </p>
                <p className="text-sm text-muted-foreground">
                  {user.phoneNumber}
                </p>
              </div>
              <div className="ml-auto font-xs text-muted-foreground">
                {new Date(user.createdAt).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default NewCustomerList;
