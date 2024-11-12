import css from "./Warding.module.scss";

function Warding() {
	return (
		<section className={css.container}>
			{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
			<svg viewBox="0 0 24 24" fill="#ff6961" name="heart">
				<path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" />
			</svg>
			<div className={css.textsContainer}>
				<h2>Dominio Proximo a vencer</h2>
				<p>
					El 22 de noviembre vencera el dominio del sitio, de momento quiero
					cambiar de nombre, pero requiero que me ayuden aportando
					economicamente para mantener el sitio.
				</p>
				<p>Si quieres aportar, puedes hacerlo a través de ko-fi o Paypal.</p>
				<div className={css["textsContainer--buttons"]}>
					<a
						className={css["container--donate"]}
						href="https://ko-fi.com/frovahappy"
					>
						Donar por Ko-fi
					</a>
					<a
						className={css["container--donate"]}
						href="https://paypal.me/frovahappy"
					>
						Donar por Paypal
					</a>
				</div>
			</div>
		</section>
	);
}

export default Warding;
