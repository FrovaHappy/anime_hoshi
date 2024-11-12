import css from "./MoreInfo.module.scss";
function MoreInfo() {
	return (
		<section className={css.container}>
			{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
				<path d="M12 9h.01" />
				<path d="M11 12h1v4h1" />
			</svg>
			<p>
				para ver mas información sobre el proyecto, puedes ver el{" "}
				<a href="https://gist.github.com/FrovaHappy/c8b3332d9db55036afc60a480d72d5c7">
					roadmap
				</a>{" "}
				para el futuro o sígueme en{" "}
				<a href="https://twitter.com/frova_happy">twitter</a> donde estaré
				actualizando el avance de este y mas proyectos.
			</p>
		</section>
	);
}

export default MoreInfo;
