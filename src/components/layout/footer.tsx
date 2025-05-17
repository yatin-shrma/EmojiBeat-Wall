export default function AppFooter() {
  return (
    <footer className="border-t border-border/40 py-6 mt-auto">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} EmojiBeat Wall. Party on!</p>
      </div>
    </footer>
  );
}
