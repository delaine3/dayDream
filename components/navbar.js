import Link from "next/link";

export default function Navbar() {
  return (
    <div className="nav-bar">
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{" "}
        <Link href="/plots">
          <a>Plots</a>
        </Link>{" "}
        <Link href="/writing_excercises">
          <a>Writing Excercise</a>
        </Link>{" "}
        <Link href="/characters">
          <a>Characters</a>
        </Link>{" "}
        <a id="portfolio" href="https://delaine-abner-portfolio.vercel.app/">
          Back to Portfolio
        </a>
      </nav>
    </div>
  );
}
