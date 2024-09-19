import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsLinkedin,
} from "react-icons/bs";
export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white blog-title"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Sticky
              </span>
              Notes
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                {/* Modify it as your wish */}
                <Footer.Link
                  href="https://my-creative-journy.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  20+ MERN Projects
                </Footer.Link>

                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Janmejay&#39;s Notes
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/JAnmejayVASahu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href="https://t.me/+fF81Db72mmA2NGJl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Telegram
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />

        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#" // add your profile/portfolio's link here
            by="Janmejay's Notes"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            {/* <Footer.Icon href='#' icon={BsFacebook}/> */}
            <Footer.Icon
              href="https://www.instagram.com/prs_janmejay/"
              icon={BsInstagram}
            />
            {/* <Footer.Icon href='#' icon={BsTwitter}/> */}
            <Footer.Icon
              href="https://github.com/JAnmejayVASahu"
              icon={BsGithub}
            />
            <Footer.Icon
              href="https://www.linkedin.com/in/janmejay-sahu/"
              icon={BsLinkedin}
            />{" "}
            {/* it may be show you an error to show the linkdin icon */}
          </div>
        </div>
      </div>
    </Footer>
  );
}
