import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Simple layout that doesn't check auth itself BUT acts as a wrapper.
    // Auth check needs to happen per page or in middleware.
    // For simplicity (as per plan), we check here for the sub-routes.
    // EXCEPT for /admin/login.

    // Since layout wraps /admin/login too, we can't block everything here safely without checking path.
    // But in Next.js App Router, layout wraps all children.
    // If we put this layout in /app/admin/layout.tsx, it wraps /app/admin/login too.

    // Strategy: Move the protected content to /app/admin/(protected)/... 
    // OR just check cookie here and allow if path is login? Headers in layout are read-only-ish context.

    // Easier way for this scale: 
    // Let's make /app/admin/layout.tsx just a shell.
    // And doing the check in /app/admin/tweets/page.tsx (and other protected pages) 
    // OR use a Group Route for protected pages: /app/admin/(dashboard)/layout.tsx

    // Let's stick to the plan but make it robust.
    // We'll create a (dashboard) group for protected routes.
    // But to keep file structure simple as per plan:
    // We will check cookie in this layout, but we need to know if we are on login page.
    // Layouts don't know the current path easily.

    // Better: Create /app/admin/layout.tsx that is just a container.
    // And implement the check in /app/admin/tweets/layout.tsx or page.tsx.

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            {children}
        </div>
    );
}
