import css from "./MoreInfo.module.scss";
function MoreInfo() {
	return (
		<section className={css.container}>
			{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
				<path d="M12 9h.01" />
				<path d="M11 12h1v4h1" />
			</svg>
			<p>
				Para más información sobre el proyecto, te invito a consultar el
				<a href="https://gist.github.com/FrovaHappy/c8b3332d9db55036afc60a480d72d5c7">
					roadmap
				</a>
				, donde podrás ver nuestros planes futuros. También puedes seguirme en
				<a href="https://twitter.com/frova_happy">Twitter</a> , donde compartiré
				actualizaciones sobre este y otros proyectos en desarrollo.
			</p>
		</section>
	);
}

export default MoreInfo;
