
const ContainerHeader = ({ children, title }: { children: React.ReactNode, title: string }) => {
  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-foundry-border/50 bg-foundry-surface/30">
      <h1 className="text-xl font-medium text-white tracking-tight flex items-center gap-2">
        {title}
      </h1>
      {children}
    </header>
  )
}

export default ContainerHeader