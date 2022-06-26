import Link from "next/link";

export default function Navbar() {
  return (
    <div className="nav-bar">
      <nav>
        <Link href="/">
          <a className="nav-link">Home</a>
        </Link>{" "}
        <Link href="/plots">
          <a className="nav-link">Plots</a>
        </Link>{" "}
        <Link href="/characters">
          <a className="nav-link">Characters</a>
        </Link>{" "}

      </nav>

    </div>
  );
}
