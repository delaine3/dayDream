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
        <Link href="/writing_excercises">
          <a className="nav-link">Writing Excercise</a>
        </Link>{" "}
        <Link href="/characters">
          <a className="nav-link">Characters</a>
        </Link>{" "}
        <a
          id="portfolio"
          className="nav-link"
          href="https://delaine-abner-portfolio.vercel.app/"
        >
          Back to Portfolio
        </a>
      </nav>
    </div>
  );
}
