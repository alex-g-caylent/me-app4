const links = [
    {
        label: "Home",
        href: "/home",
        for: "Learner",
    },
    {
        label: "My Profile",
        href: "/my/profile",
        for: ["Learner", "Editor"],
    },
    {
        label: "ChatMaestro",
        href: "/my/chats",
        for: ["Learner", "Editor", "User Manager"],
    },
    {
        label: "Library",
        href: "/mylibrary",
        for: "Learner",
    },
    {
        label: "Manage users",
        href: "/users",
        for: ["User Manager"],
    },
    {
        label: "Content",
        href: "/articles",
        for: "Editor",
    },
    {
        label: "Help",
        href: "/help",
        for: "all",
    },
];

export default links;
