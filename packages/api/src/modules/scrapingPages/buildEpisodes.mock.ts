/* eslint-disable no-tabs */
export const PageContentHTML = `
<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title>Ver Anime Online HD  — AnimeFLV</title>
    
    <meta property="og:title" content="Anime Online - AnimeFLV"/>
    <meta name="google-site-verification" content="JxH0mAUU_FZ1FqciSq1lb8WmH8WMDKwhSoWmW31ze8U" />
    <meta content='es' http-equiv='content-language' />
    <meta content='es' name='language' />
    <meta property="og:site_name" content="AnimeFLV"/>
    <link rel="canonical" href="https://www3.animeflv.net" />
    <link rel="alternate" media="only screen and (max-width: 640px)" href="https://m.animeflv.net">
    <meta name="robots" content="index, follow">
    <meta name="description" content="El mejor portal de anime online para latinoamérica, encuentra animes clásicos, animes del momento, animes más populares y mucho más, todo en animeflv, tu fuente de anime diaria."/>

    
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,700,400italic' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" href="/assets/animeflv/css/font-awesome.css" />
    <link rel="stylesheet" type="text/css" href="/assets/animeflv/css/css.css?v=1.3.4" />
    <link rel="stylesheet" type="text/css" href="/assets/animeflv/css/bootstrap.css" />
    <script type="text/javascript" src="/assets/animeflv/js/modernizr.js"></script>

    <script src="https://apis.google.com/js/platform.js"></script>
    <meta name="verify-admitad" content="34e2b77cc8" />
    <meta content='es' http-equiv='content-language' />
    <meta content='es' name='language' />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta property="fb:app_id" content="1730508916998105"/>
    <link rel="manifest" href="/manifest.json" />
    <meta name="monetag" content="ead37e1f95ad5b49c1acf5dfea76754c">

</head>


<body>
    <div id="fb-root"></div>
    <script async defer crossorigin="anonymous" src="https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v6.0&appId=1730508916998105&autoLogAppEvents=1"></script>
<script src="/js/ads.js"></script>

<!--
    <div class="FollowUs">
        <div class="Container">
        <div class="close-dv">
            <button class="close-social"><i class="fa-times"></i></button>
        </div>
        <aside>
            <div class="ttl">¿Ya sigues nuestras Redes Sociales?</div>
            <p>Si quieres mantenerte informado de nuestros proximos proyectos, no olvides visitar nuestras redes sociales</p>
        </aside>
        <ul>
            <li class="fcb">
                <a href="https://www.facebook.com/groups/armyanime" target="_blank">
                    <i class="fa-facebook"></i>
                    <span>@Grupo Anime Army</span>
                </a>
            </li>
            <li class="twt">
                <a href="https://twitter.com/ArmyAnime_" target="_blank">
                    <i class="fa-twitter"></i>
                    <span>@Anime Army</span>
                </a>
            </li>
            <li class="nst">
                <a href="https://www.instagram.com/animearmy.jp/" target="_blank">
                    <i class="fa-instagram"></i>
                    <span>@Anime Army</span>
                </a>
            </li>
        </ul>
        </div>
    </div>
-->




<!--<all>-->
<div class="Wrapper">
    <!--<Header>-->
    <header class="Header">    
        


        <div class="Mid">
            <div class="Container">


                

                <div class="AX Row AFluid">
                    <div class="Logo">
                        <a href="/"><img src="/assets/animeflv/img/logo.png?v=2.3" alt="AnimeFLV" /></a>
                    </div>
                    <div class="AFixed">
                        <input type="checkbox" hidden="hidden" id="BtnMenu">
                        <label for="BtnMenu" class="BtnMenu fa-bars"><span>MENU</span></label>
                        <nav class="CX Row">
                            <input type="checkbox" hidden="hidden" id="Hd-Search">
                            <div class="Search"> <!-- Agrega la class "On" para mostrar los resultados -->
                                <form action="/browse" method="get">
                                    <input name="q" type="text" id="search-anime" autocomplete="off" placeholder="Buscar...">
                                    <button><i class="fa-search"></i></button>
                                </form>
                                <div class="DpdwCnt TtCn">
                                    <ul class="ListResult"></ul>
                                </div>
                            </div>

                                                            <div class="Login">
                                    <input type="checkbox" hidden="hidden" id="DpdwLnk-Login">
                                    <label for="DpdwLnk-Login" class="Button"><span class="fa-user">Login</span></label>
                                    <div class="DpdwCnt TtCn">
                                        <div class="Title">INICIAR SESION</div>


                                        <form action="/auth/sign_in" class="form-horizontal" method="POST">                                            <label class="Form-Icon Right">
                                                <input name="email" type="text" placeholder="E-Mail">
                                                <i class="fa-user"></i>
                                            </label>
                                            <label class="Form-Icon Right">
                                                <input name="password" type="password" placeholder="Contraseña">
                                                <input type="hidden" name="remember_me" value="1">
                                                <i class="fa-lock"></i>
                                            </label>
                                            <button type="submit">INICIAR SESIÓN</button>
                                            <a href="/auth/facebook/sign_in" rel="nofollow" class="Button fb_login"><span class="fa-facebook">INICIAR SESION CON FB</span></a>
                                            <div class="Links">
                                                <a href="/auth/sign_up"  rel="nofollow" >Registrate</a>
                                                <a href="/auth/password/new"  rel="nofollow" >¿Olvidaste tu contraseña?</a>
                                            </div>
                                        </form>                                    </div>
                                </div>
                                                        <ul class="Menu">
                                <li><a href="/">Inicio</a></li>
                             
                                <li><a href="/browse">Directorio Anime</a></li>
                                
                            </ul>
                            <!--<ul class="ListSocial BFixed">
                                <li><a href="https://www.facebook.com/armyanime.jp"  rel="nofollow" target="_blank" class="fa-facebook"></a></li>
                            </ul>-->
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        
        
    </header>

	
	<!--<a class="lvbx" href="https://www.tiktok.com/@kotorihikari/live" target="_blank" rel="noreferrer noopener"><span>Kotori Hikari en TIKTOK</span> está en vivo <i class="lvic"></i></a>-->
    <!--<Body>-->

    <div class="Body">
        
<div class="Container">


    <div class="AnflvTl">
        <h1><strong>AnimeFLV</strong> tu fuente de anime online gratis en HD</h1>
    </div>


    <div class="BX Row BFluid Sp20">
        <aside class="Sidebar BFixed">
            

           
            <!--<a href="https://www.twitch.tv/kotorihikari/about" rel="nofollow" target="_blank"><img src="https://animeflv.net/assets/animeflv/img/kotori.png" alt="Kotori Twitch"></a>-->
            <!--<a href="https://www.twitch.tv/linavermillion/about" rel="nofollow" target="_blank"><img src="https://animeflv.net/assets/animeflv/img/lina-boton.png" alt="Lina Twitch"></a> -->
            <!--
            <a href="https://bit.ly/3hKQ7pB" rel="nofollow" target="_blank"><img src="https://animeflv.net/assets/animeflv/img/300x250.png" alt="Wallpepe"></a>

            <a href="https://www.facebook.com/armyanime.jp" target="_blank" rel="nofollow"><img src="https://animeflv.net/assets/animeflv/img/fb-flv.png" alt="Facebook AnimeFLV"></a> 

            <br /><br />
                 --> 

            <div class="Wdgt Emision">
                <input type="checkbox" hidden="hidden" id="WdgtLink-B">
                <div class="Top fa-play"><strong>ANIMES EN EMISIÓN</strong> <label for="WdgtLink-B" class="WdgtLink fa-chevron-down"></label></div>
                <div class="Bod ScrlV Fl">
                    <ul class="ListSdbr">
                                                    <li><a href="/anime/one-piece-tv" class="fa-play-circle">One Piece <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/detective-conan" class="fa-play-circle">Detective Conan <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/shadowverse-flame" class="fa-play-circle">Shadowverse Flame <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/dr-stone-new-world" class="fa-play-circle">Dr. Stone: New World <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/mahoutsukai-no-yome-season-2" class="fa-play-circle">Mahoutsukai no Yome Season 2 <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/dead-mount-death-play" class="fa-play-circle">Dead Mount Death Play <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/jujutsu-kaisen-2nd-season" class="fa-play-circle">Jujutsu Kaisen 2nd Season <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/rurouni-kenshin-meiji-kenkaku-romantan-2023" class="fa-play-circle">Rurouni Kenshin: Meiji Kenkaku Romantan (2023) <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/zom-100-zombie-ni-naru-made-ni-shitai-100-no-koto" class="fa-play-circle">Zom 100: Zombie ni Naru made ni Shitai 100 no Koto <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/dark-gathering" class="fa-play-circle">Dark Gathering <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/helck" class="fa-play-circle">Helck <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/boukensha-ni-naritai-to-miyako-ni-deteitta-musume-ga-srank-ni-natteta" class="fa-play-circle">Boukensha ni Naritai to Miyako ni Deteitta Musume ga S-Rank ni Natteta <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/ojou-to-bankenkun" class="fa-play-circle">Ojou to Banken-kun <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/sousou-no-frieren" class="fa-play-circle">Sousou no Frieren <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/megumi-no-daigo-kyuukoku-no-orange" class="fa-play-circle">Megumi no Daigo: Kyuukoku no Orange <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/mf-ghost" class="fa-play-circle">MF Ghost <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/ragna-crimson" class="fa-play-circle">Ragna Crimson <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/captain-tsubasa-season-2-junior-youthhen" class="fa-play-circle">Captain Tsubasa Season 2: Junior Youth-hen <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/dekoboko-majo-no-oyako-jijou" class="fa-play-circle">Dekoboko Majo no Oyako Jijou <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/shangrila-frontier-kusoge-hunter-kamige-ni-idoman-to-su" class="fa-play-circle">Shangri-La Frontier: Kusoge Hunter, Kamige ni Idoman to su <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/overtake" class="fa-play-circle">Overtake! <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/boushoku-no-berserk" class="fa-play-circle">Boushoku no Berserk <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/migi-to-dali" class="fa-play-circle">Migi to Dali <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/kamonohashi-ron-no-kindan-suiri" class="fa-play-circle">Kamonohashi Ron no Kindan Suiri <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/shy" class="fa-play-circle">Shy <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/watashi-no-oshi-wa-akuyaku-reijou" class="fa-play-circle">Watashi no Oshi wa Akuyaku Reijou. <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/toaru-ossan-no-vrmmo-katsudouki" class="fa-play-circle">Toaru Ossan no VRMMO Katsudouki <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/seiken-gakuin-no-makentsukai" class="fa-play-circle">Seiken Gakuin no Makentsukai <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/bproject-netsuretsulove-call" class="fa-play-circle">B-Project: Netsuretsu*Love Call <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/paradox-live-the-animation" class="fa-play-circle">Paradox Live the Animation <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/seijo-no-maryoku-wa-bannou-desu-2nd-season" class="fa-play-circle">Seijo no Maryoku wa Bannou desu 2nd Season <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/tokyo-revengers-tenjikuhen" class="fa-play-circle">Tokyo Revengers: Tenjiku-hen <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/bullbuster" class="fa-play-circle">Bullbuster <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/konyaku-haki-sareta-reijou-wo-hirotta-ore-ga-ikenai-koto-wo-oshiekomu" class="fa-play-circle">Konyaku Haki sareta Reijou wo Hirotta Ore ga, Ikenai Koto wo Oshiekomu <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/kage-no-jitsuryokusha-ni-naritakute-2nd-season" class="fa-play-circle">Kage no Jitsuryokusha ni Naritakute! 2nd Season <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/16bit-sensation-another-layer" class="fa-play-circle">16bit Sensation: Another Layer <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/kamierabi" class="fa-play-circle">Kamierabi <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/under-ninja" class="fa-play-circle">Under Ninja <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/uma-musume-pretty-derby-season-3" class="fa-play-circle">Uma Musume: Pretty Derby Season 3 <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/tate-no-yuusha-no-nariagari-season-3" class="fa-play-circle">Tate no Yuusha no Nariagari Season 3 <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/goblin-slayer-ii" class="fa-play-circle">Goblin Slayer II <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/keikenzumi-na-kimi-to-keiken-zero-na-ore-ga-otsukiai-suru-hanashi" class="fa-play-circle">Keikenzumi na Kimi to, Keiken Zero na Ore ga, Otsukiai suru Hanashi. <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/arknights-fuyukomori-kaerimichi" class="fa-play-circle">Arknights: Fuyukomori Kaerimichi <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/hametsu-no-oukoku" class="fa-play-circle">Hametsu no Oukoku <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/kanojo-mo-kanojo-season-2" class="fa-play-circle">Kanojo mo Kanojo Season 2 <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/undead-unluck" class="fa-play-circle">Undead Unluck <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/yuzukisan-chi-no-yonkyoudai" class="fa-play-circle">Yuzuki-san Chi no Yonkyoudai. <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/saihate-no-paladin-tetsusabi-no-yama-no-ou" class="fa-play-circle">Saihate no Paladin: Tetsusabi no Yama no Ou <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/spy-x-family-season-2" class="fa-play-circle">Spy x Family Season 2 <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/tearmoon-teikoku-monogatari-dantoudai-kara-hajimaru-hime-no-tensei-gyakuten-story" class="fa-play-circle">Tearmoon Teikoku Monogatari: Dantoudai kara Hajimaru, Hime no Tensei Gyakuten Story <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/hikikomari-kyuuketsuki-no-monmon" class="fa-play-circle">Hikikomari Kyuuketsuki no Monmon <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/kikansha-no-mahou-wa-tokubetsu-desu" class="fa-play-circle">Kikansha no Mahou wa Tokubetsu desu <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/atarashii-joushi-wa-do-tennen" class="fa-play-circle">Atarashii Joushi wa Do Tennen <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/buta-no-liver-wa-kanetsu-shiro" class="fa-play-circle">Buta no Liver wa Kanetsu Shiro <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/potiondanomi-de-ikinobimasu" class="fa-play-circle">Potion-danomi de Ikinobimasu! <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/bokura-no-ameiro-protocol" class="fa-play-circle">Bokura no Ameiro Protocol <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/kibou-no-chikara-otona-precure-23" class="fa-play-circle">Kibou no Chikara: Otona Precure '23 <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/the-idolmster-million-live" class="fa-play-circle">The iDOLM@STER Million Live! <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/kimi-no-koto-ga-daidaidaidaidaisuki-na-100nin-no-kanojo" class="fa-play-circle">Kimi no Koto ga Daidaidaidaidaisuki na 100-nin no Kanojo <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/hoshikuzu-telepath" class="fa-play-circle">Hoshikuzu Telepath <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/kawagoe-boys-sing" class="fa-play-circle">Kawagoe Boys Sing <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/hypnosis-mic-division-rap-battle-rhyme-anima-plus" class="fa-play-circle">Hypnosis Mic: Division Rap Battle - Rhyme Anima Plus <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/houkago-shounen-hanakokun" class="fa-play-circle">Houkago Shounen Hanako-kun <span class="Type tv">Anime</span></a></li>
                                                    <li><a href="/anime/kusuriya-no-hitorigoto" class="fa-play-circle">Kusuriya no Hitorigoto <span class="Type tv">Anime</span></a></li>
                                            </ul>
                </div>
            </div>

                        


                
        </aside>

        <main class="Main">
            <!--<Episodios>-->


            <div class="Title Page">
                <h2>Últimos episodios</h2>
                <div class="Order">
                    <a href="#" class="Active">HOY</a>
                </div>
            </div>
            <ul class="ListEpisodios AX Rows A06 C04 D03">
                                <li>
                    <a href="/ver/bproject-netsuretsulove-call-4" class="fa-play">
                        <span class="Image"><img src="/uploads/animes/thumbs/3874.jpg" alt="B-Project: Netsuretsu*Love Call"></span>
                        <span class="Capi">Episodio 4</span>
                        <strong class="Title">B-Project: Netsuretsu*Love Call</strong>
                    </a>
                </li>
                                <li>
                    <a href="/ver/seiken-gakuin-no-makentsukai-4" class="fa-play">
                        <span class="Image"><img src="/uploads/animes/thumbs/3873.jpg" alt="Seiken Gakuin no Makentsukai"></span>
                        <span class="Capi">Episodio 4</span>
                        <strong class="Title">Seiken Gakuin no Makentsukai</strong>
                    </a>
                </li>
                                <li>
                    <a href="/ver/toaru-ossan-no-vrmmo-katsudouki-4" class="fa-play">
                        <span class="Image"><img src="/uploads/animes/thumbs/3872.jpg" alt="Toaru Ossan no VRMMO Katsudouki"></span>
                        <span class="Capi">Episodio 4</span>
                        <strong class="Title">Toaru Ossan no VRMMO Katsudouki</strong>
                    </a>
                </li>
                                <li>
                    <a href="/ver/watashi-no-oshi-wa-akuyaku-reijou-4" class="fa-play">
                        <span class="Image"><img src="/uploads/animes/thumbs/3871.jpg" alt="Watashi no Oshi wa Akuyaku Reijou."></span>
                        <span class="Capi">Episodio 4</span>
                        <strong class="Title">Watashi no Oshi wa Akuyaku Reijou.</strong>
                    </a>
                </li>
                                <li>
                    <a href="/ver/shy-4" class="fa-play">
                        <span class="Image"><img src="/uploads/animes/thumbs/3870.jpg" alt="Shy"></span>
                        <span class="Capi">Episodio 4</span>
                        <strong class="Title">Shy</strong>
                    </a>
                </li>
                                <li>
                    <a href="/ver/dead-mount-death-play-15" class="fa-play">
                        <span class="Image"><img src="/uploads/animes/thumbs/3803.jpg" alt="Dead Mount Death Play"></span>
                        <span class="Capi">Episodio 15</span>
                        <strong class="Title">Dead Mount Death Play</strong>
                    </a>
                </li>
                                <li>
                    <a href="/ver/kawagoe-boys-sing-3" class="fa-play">
                        <span class="Image"><img src="/uploads/animes/thumbs/3906.jpg" alt="Kawagoe Boys Sing"></span>
                        <span class="Capi">Episodio 3</span>
                        <strong class="Title">Kawagoe Boys Sing</strong>
                    </a>
                </li>
                                <li>
                    <a href="/ver/kamonohashi-ron-no-kindan-suiri-4" class="fa-play">
                        <span class="Image"><img src="/uploads/animes/thumbs/3869.jpg" alt="Kamonohashi Ron no Kindan Suiri"></span>
                        <span class="Capi">Episodio 4</span>
                        <strong class="Title">Kamonohashi Ron no Kindan Suiri</strong>
                    </a>
                </li>
                                <li>
                    <a href="/ver/migi-to-dali-4" class="fa-play">
                        <span class="Image"><img src="/uploads/animes/thumbs/3868.jpg" alt="Migi to Dali"></span>
                        <span class="Capi">Episodio 4</span>
                        <strong class="Title">Migi to Dali</strong>
                    </a>
                </li>
                                <li>
                    <a href="/ver/hoshikuzu-telepath-3" class="fa-play">
                        <span class="Image"><img src="/uploads/animes/thumbs/3905.jpg" alt="Hoshikuzu Telepath"></span>
                        <span class="Capi">Episodio 3</span>
                        <strong class="Title">Hoshikuzu Telepath</strong>
                    </a>
                </li>
                                <li>
                    <a href="/ver/dark-gathering-16" class="fa-play">
                        <span class="Image"><img src="/uploads/animes/thumbs/3849.jpg" alt="Dark Gathering"></span>
                        <span class="Capi">Episodio 16</span>
                        <strong class="Title">Dark Gathering</strong>
                    </a>
                </li>
                                <li>
                    <a href="/ver/mf-ghost-4" class="fa-play">
                        <span class="Image"><img src="/uploads/animes/thumbs/3861.jpg" alt="MF Ghost"></span>
                        <span class="Capi">Episodio 4</span>
                        <strong class="Title">MF Ghost</strong>
                    </a>
                </li>
                                <li>
                    <a href="/ver/boushoku-no-berserk-4" class="fa-play">
                        <span class="Image"><img src="/uploads/animes/thumbs/3867.jpg" alt="Boushoku no Berserk"></span>
                        <span class="Capi">Episodio 4</span>
                        <strong class="Title">Boushoku no Berserk</strong>
                    </a>
                </li>
                                <li>
                    <a href="/ver/overtake-4" class="fa-play">
                        <span class="Image"><img src="/uploads/animes/thumbs/3866.jpg" alt="Overtake!"></span>
                        <span class="Capi">Episodio 4</span>
                        <strong class="Title">Overtake!</strong>
                    </a>
                </li>
                                <li>
                    <a href="/ver/dekoboko-majo-no-oyako-jijou-5" class="fa-play">
                        <span class="Image"><img src="/uploads/animes/thumbs/3864.jpg" alt="Dekoboko Majo no Oyako Jijou"></span>
                        <span class="Capi">Episodio 5</span>
                        <strong class="Title">Dekoboko Majo no Oyako Jijou</strong>
                    </a>
                </li>
                                <li>
                    <a href="/ver/kimi-no-koto-ga-daidaidaidaidaisuki-na-100nin-no-kanojo-3" class="fa-play">
                        <span class="Image"><img src="/uploads/animes/thumbs/3904.jpg" alt="Kimi no Koto ga Daidaidaidaidaisuki na 100-nin no Kanojo"></span>
                        <span class="Capi">Episodio 3</span>
                        <strong class="Title">Kimi no Koto ga Daidaidaidaidaisuki na 100-nin no Kanojo</strong>
                    </a>
                </li>
                                <li>
                    <a href="/ver/shangrila-frontier-kusoge-hunter-kamige-ni-idoman-to-su-4" class="fa-play">
                        <span class="Image"><img src="/uploads/animes/thumbs/3865.jpg" alt="Shangri-La Frontier: Kusoge Hunter, Kamige ni Idoman to su"></span>
                        <span class="Capi">Episodio 4</span>
                        <strong class="Title">Shangri-La Frontier: Kusoge Hunter, Kamige ni Idoman to su</strong>
                    </a>
                </li>
                                <li>
                    <a href="/ver/captain-tsubasa-season-2-junior-youthhen-4" class="fa-play">
                        <span class="Image"><img src="/uploads/animes/thumbs/3863.jpg" alt="Captain Tsubasa Season 2: Junior Youth-hen"></span>
                        <span class="Capi">Episodio 4</span>
                        <strong class="Title">Captain Tsubasa Season 2: Junior Youth-hen</strong>
                    </a>
                </li>
                                <li>
                    <a href="/ver/one-piece-tv-1080" class="fa-play">
                        <span class="Image"><img src="/uploads/animes/thumbs/7.jpg" alt="One Piece"></span>
                        <span class="Capi">Episodio 1080</span>
                        <strong class="Title">One Piece</strong>
                    </a>
                </li>
                                <li>
                    <a href="/ver/the-idolmster-million-live-3" class="fa-play">
                        <span class="Image"><img src="/uploads/animes/thumbs/3903.jpg" alt="The iDOLM@STER Million Live!"></span>
                        <span class="Capi">Episodio 3</span>
                        <strong class="Title">The iDOLM@STER Million Live!</strong>
                    </a>
                </li>
                            </ul>
                    
                    
                    


            <div class="Title Page fa-star">
                <h2>Últimos animes agregados</h2>
                <div class="Order">
                    <a href="#" class="Active">HOY</a>
                </div>
            </div>
            <!--<Animes>-->
            <ul class="ListAnimes AX Rows A06 C04 D03">
                                            <li>
                                <article class="Anime alt B">
                                    <a href="/anime/kusuriya-no-hitorigoto">
                                        <span class="Estreno"><span>ESTRENO</span></span>                                        <div class="Image fa-play-circle-o">
                                            <figure><img src="/uploads/animes/covers/3909.jpg" alt="Kusuriya no Hitorigoto"></figure>
                                            <span class="Type tv">Anime</span>
                                        </div>
                                        <h3 class="Title">Kusuriya no Hitorigoto</h3>
                                    </a>
                                    <div class="Description">
                                        <div class="Title"><strong>Kusuriya no Hitorigoto</strong></div>
                                        <p><span class="Type tv">Anime</span> <span class="Vts fa-star">4.6</span></p>
                                        <p>Maomao llevaba una vida tranquila ayudando a su padre, un boticario. Todo cambia el día que la venden como sirvienta al palacio del emperador, pero la vida entre nobles y realeza no es para ella. Cuando la familia imperial enferma, ella decide intervenir para encontrar una cura, lo que llama la ate...</p>

                                        <a class="Button Vrnmlk" href="/anime/kusuriya-no-hitorigoto">VER ANIME</a>
                                    </div>
                                </article>
                            </li>
                                                    <li>
                                <article class="Anime alt B">
                                    <a href="/anime/houkago-shounen-hanakokun">
                                        <span class="Estreno"><span>ESTRENO</span></span>                                        <div class="Image fa-play-circle-o">
                                            <figure><img src="/uploads/animes/covers/3908.jpg" alt="Houkago Shounen Hanako-kun"></figure>
                                            <span class="Type tv">Anime</span>
                                        </div>
                                        <h3 class="Title">Houkago Shounen Hanako-kun</h3>
                                    </a>
                                    <div class="Description">
                                        <div class="Title"><strong>Houkago Shounen Hanako-kun</strong></div>
                                        <p><span class="Type tv">Anime</span> <span class="Vts fa-star">4.4</span></p>
                                        <p>El espíritu Hanako y su ayudante humana, la estudiante de primer año Nene Yashiro, mantienen la paz entre las fuerzas sobrenaturales y los estudiantes de la Academia Kamome. Cuando no están luchando por mantener el equilibrio entre el mundo de los vivos y el de los espíritus, ¿cómo pasan el ti...</p>

                                        <a class="Button Vrnmlk" href="/anime/houkago-shounen-hanakokun">VER ANIME</a>
                                    </div>
                                </article>
                            </li>
                                                    <li>
                                <article class="Anime alt B">
                                    <a href="/anime/hypnosis-mic-division-rap-battle-rhyme-anima-plus">
                                        <span class="Estreno"><span>ESTRENO</span></span>                                        <div class="Image fa-play-circle-o">
                                            <figure><img src="/uploads/animes/covers/3907.jpg" alt="Hypnosis Mic: Division Rap Battle - Rhyme Anima Plus"></figure>
                                            <span class="Type tv">Anime</span>
                                        </div>
                                        <h3 class="Title">Hypnosis Mic: Division Rap Battle - Rhyme Anima Plus</h3>
                                    </a>
                                    <div class="Description">
                                        <div class="Title"><strong>Hypnosis Mic: Division Rap Battle - Rhyme Anima Plus</strong></div>
                                        <p><span class="Type tv">Anime</span> <span class="Vts fa-star">3.3</span></p>
                                        <p>Segunda temporada de Hypnosis Mic: Division Rap Battle - Rhyme Anima</p>

                                        <a class="Button Vrnmlk" href="/anime/hypnosis-mic-division-rap-battle-rhyme-anima-plus">VER ANIME</a>
                                    </div>
                                </article>
                            </li>
                                                    <li>
                                <article class="Anime alt B">
                                    <a href="/anime/kawagoe-boys-sing">
                                        <span class="Estreno"><span>ESTRENO</span></span>                                        <div class="Image fa-play-circle-o">
                                            <figure><img src="/uploads/animes/covers/3906.jpg" alt="Kawagoe Boys Sing"></figure>
                                            <span class="Type tv">Anime</span>
                                        </div>
                                        <h3 class="Title">Kawagoe Boys Sing</h3>
                                    </a>
                                    <div class="Description">
                                        <div class="Title"><strong>Kawagoe Boys Sing</strong></div>
                                        <p><span class="Type tv">Anime</span> <span class="Vts fa-star">3.0</span></p>
                                        <p>Tenshi formaba parte de un coro cuando era un niño y adora cantar, pero no tiene valor para cantar ante un público, así que se conforma con una de estudiante tranquila y sin estrés. Pero su paz se convierte en caos cuando conoce a Haruo, un antiguo director que forma un coro masculino para inten...</p>

                                        <a class="Button Vrnmlk" href="/anime/kawagoe-boys-sing">VER ANIME</a>
                                    </div>
                                </article>
                            </li>
                                                    <li>
                                <article class="Anime alt B">
                                    <a href="/anime/hoshikuzu-telepath">
                                        <span class="Estreno"><span>ESTRENO</span></span>                                        <div class="Image fa-play-circle-o">
                                            <figure><img src="/uploads/animes/covers/3905.jpg" alt="Hoshikuzu Telepath"></figure>
                                            <span class="Type tv">Anime</span>
                                        </div>
                                        <h3 class="Title">Hoshikuzu Telepath</h3>
                                    </a>
                                    <div class="Description">
                                        <div class="Title"><strong>Hoshikuzu Telepath</strong></div>
                                        <p><span class="Type tv">Anime</span> <span class="Vts fa-star">4.2</span></p>
                                        <p>Umika es una dulce pero tímida estudiante de preparatoria. Le cuesta mucho hablar con los demás y sueña con tener un amigo de otro planeta. Sin embargo, su solitaria vida escolar cambia por completo cuando conoce a Yu, una estudiante de intercambio con poderes telepáticos. Se hacen amigas íntim...</p>

                                        <a class="Button Vrnmlk" href="/anime/hoshikuzu-telepath">VER ANIME</a>
                                    </div>
                                </article>
                            </li>
                                                    <li>
                                <article class="Anime alt B">
                                    <a href="/anime/kimi-no-koto-ga-daidaidaidaidaisuki-na-100nin-no-kanojo">
                                        <span class="Estreno"><span>ESTRENO</span></span>                                        <div class="Image fa-play-circle-o">
                                            <figure><img src="/uploads/animes/covers/3904.jpg" alt="Kimi no Koto ga Daidaidaidaidaisuki na 100-nin no Kanojo"></figure>
                                            <span class="Type tv">Anime</span>
                                        </div>
                                        <h3 class="Title">Kimi no Koto ga Daidaidaidaidaisuki na 100-nin no Kanojo</h3>
                                    </a>
                                    <div class="Description">
                                        <div class="Title"><strong>Kimi no Koto ga Daidaidaidaidaisuki na 100-nin no Kanojo</strong></div>
                                        <p><span class="Type tv">Anime</span> <span class="Vts fa-star">4.3</span></p>
                                        <p>A Rentaro Aijo lo rechazaron 100 veces hasta que terminó secundaria. Desesperado, visita un santuario para rezar por tener más suerte en su nueva fase como estudiante y poder conseguirse una novia. Es entonces cuando aparece ante él el Dios del Amor y le da una buena noticia: conocerá a su alma ...</p>

                                        <a class="Button Vrnmlk" href="/anime/kimi-no-koto-ga-daidaidaidaidaisuki-na-100nin-no-kanojo">VER ANIME</a>
                                    </div>
                                </article>
                            </li>
                                                    <li>
                                <article class="Anime alt B">
                                    <a href="/anime/the-idolmster-million-live">
                                        <span class="Estreno"><span>ESTRENO</span></span>                                        <div class="Image fa-play-circle-o">
                                            <figure><img src="/uploads/animes/covers/3903.jpg" alt="The iDOLM@STER Million Live!"></figure>
                                            <span class="Type tv">Anime</span>
                                        </div>
                                        <h3 class="Title">The iDOLM@STER Million Live!</h3>
                                    </a>
                                    <div class="Description">
                                        <div class="Title"><strong>The iDOLM@STER Million Live!</strong></div>
                                        <p><span class="Type tv">Anime</span> <span class="Vts fa-star">1.4</span></p>
                                        <p>De la mano de 765 Production, 13 adolescentes caminan juntas con un sueño en común: alcanzar lo más alto como ídolos y ser conocidas en todo el país. El trabajo duro, el tesón y la constancia les permitirá alcanzar su metal. Sin embargo, la fama también separa a las personas. ¿Lograrán man...</p>

                                        <a class="Button Vrnmlk" href="/anime/the-idolmster-million-live">VER ANIME</a>
                                    </div>
                                </article>
                            </li>
                                                    <li>
                                <article class="Anime alt B">
                                    <a href="/anime/kibou-no-chikara-otona-precure-23">
                                        <span class="Estreno"><span>ESTRENO</span></span>                                        <div class="Image fa-play-circle-o">
                                            <figure><img src="/uploads/animes/covers/3902.jpg" alt="Kibou no Chikara: Otona Precure '23"></figure>
                                            <span class="Type tv">Anime</span>
                                        </div>
                                        <h3 class="Title">Kibou no Chikara: Otona Precure '23</h3>
                                    </a>
                                    <div class="Description">
                                        <div class="Title"><strong>Kibou no Chikara: Otona Precure '23</strong></div>
                                        <p><span class="Type tv">Anime</span> <span class="Vts fa-star">3.6</span></p>
                                        <p></p>

                                        <a class="Button Vrnmlk" href="/anime/kibou-no-chikara-otona-precure-23">VER ANIME</a>
                                    </div>
                                </article>
                            </li>
                                                    <li>
                                <article class="Anime alt B">
                                    <a href="/anime/bokura-no-ameiro-protocol">
                                        <span class="Estreno"><span>ESTRENO</span></span>                                        <div class="Image fa-play-circle-o">
                                            <figure><img src="/uploads/animes/covers/3901.jpg" alt="Bokura no Ameiro Protocol"></figure>
                                            <span class="Type tv">Anime</span>
                                        </div>
                                        <h3 class="Title">Bokura no Ameiro Protocol</h3>
                                    </a>
                                    <div class="Description">
                                        <div class="Title"><strong>Bokura no Ameiro Protocol</strong></div>
                                        <p><span class="Type tv">Anime</span> <span class="Vts fa-star">3.7</span></p>
                                        <p>Shun Tokinoya es un estudiante de segundo de bachillerato que trabaja en la cafetería de eSports FOX ONE. Luego de perder a su padre en un accidente, decide dejar de lado la que es su pasión por los videojuegos. Cuando descubre que la cafetería tiene muchas deudas, decide olvidar su sentimiento d...</p>

                                        <a class="Button Vrnmlk" href="/anime/bokura-no-ameiro-protocol">VER ANIME</a>
                                    </div>
                                </article>
                            </li>
                                                    <li>
                                <article class="Anime alt B">
                                    <a href="/anime/potiondanomi-de-ikinobimasu">
                                        <span class="Estreno"><span>ESTRENO</span></span>                                        <div class="Image fa-play-circle-o">
                                            <figure><img src="/uploads/animes/covers/3900.jpg" alt="Potion-danomi de Ikinobimasu!"></figure>
                                            <span class="Type tv">Anime</span>
                                        </div>
                                        <h3 class="Title">Potion-danomi de Ikinobimasu!</h3>
                                    </a>
                                    <div class="Description">
                                        <div class="Title"><strong>Potion-danomi de Ikinobimasu!</strong></div>
                                        <p><span class="Type tv">Anime</span> <span class="Vts fa-star">3.9</span></p>
                                        <p>Lo que comienza como un error fatal hace que una inteligente oficinista consiga hacer el trato de su vida. Tras morir accidentalmente por culpa de la intervención de los dioses, a Kaoru le ofrecen la oportunidad de renacer en un nuevo mundo. La joven accede, pero exige ayuda para su supervivencia e...</p>

                                        <a class="Button Vrnmlk" href="/anime/potiondanomi-de-ikinobimasu">VER ANIME</a>
                                    </div>
                                </article>
                            </li>
                                                    <li>
                                <article class="Anime alt B">
                                    <a href="/anime/buta-no-liver-wa-kanetsu-shiro">
                                        <span class="Estreno"><span>ESTRENO</span></span>                                        <div class="Image fa-play-circle-o">
                                            <figure><img src="/uploads/animes/covers/3899.jpg" alt="Buta no Liver wa Kanetsu Shiro"></figure>
                                            <span class="Type tv">Anime</span>
                                        </div>
                                        <h3 class="Title">Buta no Liver wa Kanetsu Shiro</h3>
                                    </a>
                                    <div class="Description">
                                        <div class="Title"><strong>Buta no Liver wa Kanetsu Shiro</strong></div>
                                        <p><span class="Type tv">Anime</span> <span class="Vts fa-star">3.6</span></p>
                                        <p>Cuando un hombre corriente se desmaya por comer hígado de cerdo crudo y se despierta... ¡descubre que se ha convertido en un cerdo! Está atrapado hasta que la dulce y hermosa Jess lo rescata, quien casualmente puede leer mentes. Pese a que el cerdo tiene pensamientos muy groseros, lo acepta y tie...</p>

                                        <a class="Button Vrnmlk" href="/anime/buta-no-liver-wa-kanetsu-shiro">VER ANIME</a>
                                    </div>
                                </article>
                            </li>
                                                    <li>
                                <article class="Anime alt B">
                                    <a href="/anime/atarashii-joushi-wa-do-tennen">
                                        <span class="Estreno"><span>ESTRENO</span></span>                                        <div class="Image fa-play-circle-o">
                                            <figure><img src="/uploads/animes/covers/3898.jpg" alt="Atarashii Joushi wa Do Tennen"></figure>
                                            <span class="Type tv">Anime</span>
                                        </div>
                                        <h3 class="Title">Atarashii Joushi wa Do Tennen</h3>
                                    </a>
                                    <div class="Description">
                                        <div class="Title"><strong>Atarashii Joushi wa Do Tennen</strong></div>
                                        <p><span class="Type tv">Anime</span> <span class="Vts fa-star">4.0</span></p>
                                        <p>Momose dejó su anterior trabajo debido al acoso de su jefe. Temiendo que Shirosaki, su nuevo jefe, sea igual de terrible que el anterior, empieza su primer día de trabajo muy nervioso. Mientras espera para la presentación, Momose intenta relajarse, pero tan pronto aparece Shirosaki, desaparecen s...</p>

                                        <a class="Button Vrnmlk" href="/anime/atarashii-joushi-wa-do-tennen">VER ANIME</a>
                                    </div>
                                </article>
                            </li>
                                                    <li>
                                <article class="Anime alt B">
                                    <a href="/anime/kikansha-no-mahou-wa-tokubetsu-desu">
                                        <span class="Estreno"><span>ESTRENO</span></span>                                        <div class="Image fa-play-circle-o">
                                            <figure><img src="/uploads/animes/covers/3897.jpg" alt="Kikansha no Mahou wa Tokubetsu desu"></figure>
                                            <span class="Type tv">Anime</span>
                                        </div>
                                        <h3 class="Title">Kikansha no Mahou wa Tokubetsu desu</h3>
                                    </a>
                                    <div class="Description">
                                        <div class="Title"><strong>Kikansha no Mahou wa Tokubetsu desu</strong></div>
                                        <p><span class="Type tv">Anime</span> <span class="Vts fa-star">4.5</span></p>
                                        <p>En una tierra dominada por el Dominio de las Sombras, la humanidad ha sido eliminada casi por completo. Para rescatar su planeta de la perdición inminente, seis valientes héroes libran una peligrosa batalla... pero fracasan. Sin embargo, aparece un nuevo rayo de esperanza cuando Desir, uno de los ...</p>

                                        <a class="Button Vrnmlk" href="/anime/kikansha-no-mahou-wa-tokubetsu-desu">VER ANIME</a>
                                    </div>
                                </article>
                            </li>
                                                    <li>
                                <article class="Anime alt B">
                                    <a href="/anime/hikikomari-kyuuketsuki-no-monmon">
                                        <span class="Estreno"><span>ESTRENO</span></span>                                        <div class="Image fa-play-circle-o">
                                            <figure><img src="/uploads/animes/covers/3896.jpg" alt="Hikikomari Kyuuketsuki no Monmon"></figure>
                                            <span class="Type tv">Anime</span>
                                        </div>
                                        <h3 class="Title">Hikikomari Kyuuketsuki no Monmon</h3>
                                    </a>
                                    <div class="Description">
                                        <div class="Title"><strong>Hikikomari Kyuuketsuki no Monmon</strong></div>
                                        <p><span class="Type tv">Anime</span> <span class="Vts fa-star">4.0</span></p>
                                        <p>Tras tres años de reclusión, la vampira Terakomari Gandesblood (Komari, para abreviar) se despierta y descubre que ha sido nombrada comandante del Ejército Imperial Mulnita. El problema es que su nueva unidad está formada únicamente por rufianes beligerantes que se rebelan contra sus superiores...</p>

                                        <a class="Button Vrnmlk" href="/anime/hikikomari-kyuuketsuki-no-monmon">VER ANIME</a>
                                    </div>
                                </article>
                            </li>
                                                    <li>
                                <article class="Anime alt B">
                                    <a href="/anime/tearmoon-teikoku-monogatari-dantoudai-kara-hajimaru-hime-no-tensei-gyakuten-story">
                                        <span class="Estreno"><span>ESTRENO</span></span>                                        <div class="Image fa-play-circle-o">
                                            <figure><img src="/uploads/animes/covers/3895.jpg" alt="Tearmoon Teikoku Monogatari: Dantoudai kara Hajimaru, Hime no Tensei Gyakuten Story"></figure>
                                            <span class="Type tv">Anime</span>
                                        </div>
                                        <h3 class="Title">Tearmoon Teikoku Monogatari: Dantoudai kara Hajimaru, Hime no Tensei Gyakuten Story</h3>
                                    </a>
                                    <div class="Description">
                                        <div class="Title"><strong>Tearmoon Teikoku Monogatari: Dantoudai kara Hajimaru, Hime no Tensei Gyakuten Story</strong></div>
                                        <p><span class="Type tv">Anime</span> <span class="Vts fa-star">4.4</span></p>
                                        <p>Cuando una rebelión derroca a la familia real del Imperio Tearmoon, la princesa Mia muere en la guillotina con tan solo 20 años. Para su sorpresa, al caer la hoja despierta en el pasado, concretamente ocho años antes, con lo que tiene una segunda oportunidad en su vida. Atormentada por el hecho d...</p>

                                        <a class="Button Vrnmlk" href="/anime/tearmoon-teikoku-monogatari-dantoudai-kara-hajimaru-hime-no-tensei-gyakuten-story">VER ANIME</a>
                                    </div>
                                </article>
                            </li>
                                                    <li>
                                <article class="Anime alt B">
                                    <a href="/anime/spy-x-family-season-2">
                                        <span class="Estreno"><span>ESTRENO</span></span>                                        <div class="Image fa-play-circle-o">
                                            <figure><img src="/uploads/animes/covers/3894.jpg" alt="Spy x Family Season 2"></figure>
                                            <span class="Type tv">Anime</span>
                                        </div>
                                        <h3 class="Title">Spy x Family Season 2</h3>
                                    </a>
                                    <div class="Description">
                                        <div class="Title"><strong>Spy x Family Season 2</strong></div>
                                        <p><span class="Type tv">Anime</span> <span class="Vts fa-star">4.7</span></p>
                                        <p>Segunda temporada de Spy x Family</p>

                                        <a class="Button Vrnmlk" href="/anime/spy-x-family-season-2">VER ANIME</a>
                                    </div>
                                </article>
                            </li>
                                                    <li>
                                <article class="Anime alt B">
                                    <a href="/anime/saihate-no-paladin-tetsusabi-no-yama-no-ou">
                                        <span class="Estreno"><span>ESTRENO</span></span>                                        <div class="Image fa-play-circle-o">
                                            <figure><img src="/uploads/animes/covers/3893.jpg" alt="Saihate no Paladin: Tetsusabi no Yama no Ou"></figure>
                                            <span class="Type tv">Anime</span>
                                        </div>
                                        <h3 class="Title">Saihate no Paladin: Tetsusabi no Yama no Ou</h3>
                                    </a>
                                    <div class="Description">
                                        <div class="Title"><strong>Saihate no Paladin: Tetsusabi no Yama no Ou</strong></div>
                                        <p><span class="Type tv">Anime</span> <span class="Vts fa-star">4.5</span></p>
                                        <p>Segunda temporada de Saihate no Paladin</p>

                                        <a class="Button Vrnmlk" href="/anime/saihate-no-paladin-tetsusabi-no-yama-no-ou">VER ANIME</a>
                                    </div>
                                </article>
                            </li>
                                                    <li>
                                <article class="Anime alt B">
                                    <a href="/anime/yuzukisan-chi-no-yonkyoudai">
                                        <span class="Estreno"><span>ESTRENO</span></span>                                        <div class="Image fa-play-circle-o">
                                            <figure><img src="/uploads/animes/covers/3892.jpg" alt="Yuzuki-san Chi no Yonkyoudai."></figure>
                                            <span class="Type tv">Anime</span>
                                        </div>
                                        <h3 class="Title">Yuzuki-san Chi no Yonkyoudai.</h3>
                                    </a>
                                    <div class="Description">
                                        <div class="Title"><strong>Yuzuki-san Chi no Yonkyoudai.</strong></div>
                                        <p><span class="Type tv">Anime</span> <span class="Vts fa-star">4.4</span></p>
                                        <p>La familia lo es todo. Los cuatro hermanos Yuzuki perdieron a sus padres hace dos años y ahora se esfuerzan para sobrevivir solos. Hayato es el mayor, y lo siguen Mikoto, Minato y el pequeño Gakuto. Hayato trabaja y mantiene a la familia. Mikoto es relajado y calmado. Minato está repleto de energ...</p>

                                        <a class="Button Vrnmlk" href="/anime/yuzukisan-chi-no-yonkyoudai">VER ANIME</a>
                                    </div>
                                </article>
                            </li>
                                                    <li>
                                <article class="Anime alt B">
                                    <a href="/anime/undead-unluck">
                                        <span class="Estreno"><span>ESTRENO</span></span>                                        <div class="Image fa-play-circle-o">
                                            <figure><img src="/uploads/animes/covers/3891.jpg" alt="Undead Unluck"></figure>
                                            <span class="Type tv">Anime</span>
                                        </div>
                                        <h3 class="Title">Undead Unluck</h3>
                                    </a>
                                    <div class="Description">
                                        <div class="Title"><strong>Undead Unluck</strong></div>
                                        <p><span class="Type tv">Anime</span> <span class="Vts fa-star">4.8</span></p>
                                        <p>Tras leer la conclusión de su serie de manga favorita, Fuuko Izumo se siente finalmente preparada para poner fin a su existencia. Durante los últimos 10 años, Fuuko se ha visto afectada por una condición que trae consigo una desgracia extrema para cualquiera que la toque. Esto ha tenido un efect...</p>

                                        <a class="Button Vrnmlk" href="/anime/undead-unluck">VER ANIME</a>
                                    </div>
                                </article>
                            </li>
                                                    <li>
                                <article class="Anime alt B">
                                    <a href="/anime/kanojo-mo-kanojo-season-2">
                                        <span class="Estreno"><span>ESTRENO</span></span>                                        <div class="Image fa-play-circle-o">
                                            <figure><img src="/uploads/animes/covers/3890.jpg" alt="Kanojo mo Kanojo Season 2"></figure>
                                            <span class="Type tv">Anime</span>
                                        </div>
                                        <h3 class="Title">Kanojo mo Kanojo Season 2</h3>
                                    </a>
                                    <div class="Description">
                                        <div class="Title"><strong>Kanojo mo Kanojo Season 2</strong></div>
                                        <p><span class="Type tv">Anime</span> <span class="Vts fa-star">4.3</span></p>
                                        <p>Segunda temporada de Kanojo mo Kanojo</p>

                                        <a class="Button Vrnmlk" href="/anime/kanojo-mo-kanojo-season-2">VER ANIME</a>
                                    </div>
                                </article>
                            </li>
                                                    <li>
                                <article class="Anime alt B">
                                    <a href="/anime/hametsu-no-oukoku">
                                        <span class="Estreno"><span>ESTRENO</span></span>                                        <div class="Image fa-play-circle-o">
                                            <figure><img src="/uploads/animes/covers/3889.jpg" alt="Hametsu no Oukoku"></figure>
                                            <span class="Type tv">Anime</span>
                                        </div>
                                        <h3 class="Title">Hametsu no Oukoku</h3>
                                    </a>
                                    <div class="Description">
                                        <div class="Title"><strong>Hametsu no Oukoku</strong></div>
                                        <p><span class="Type tv">Anime</span> <span class="Vts fa-star">4.5</span></p>
                                        <p>En el pasado, las brujas eran respetadas por la sabiduría y la magia que otorgaban a los humanos. Con el auge de la era del Gear Expansion, la nueva comunidad científica dictaminó que las brujas eran enemigas de la sociedad que impedían su progreso. Así comenzó la caza de las brujas, incluyend...</p>

                                        <a class="Button Vrnmlk" href="/anime/hametsu-no-oukoku">VER ANIME</a>
                                    </div>
                                </article>
                            </li>
                                                    <li>
                                <article class="Anime alt B">
                                    <a href="/anime/arknights-fuyukomori-kaerimichi">
                                        <span class="Estreno"><span>ESTRENO</span></span>                                        <div class="Image fa-play-circle-o">
                                            <figure><img src="/uploads/animes/covers/3888.jpg" alt="Arknights: Fuyukomori Kaerimichi"></figure>
                                            <span class="Type tv">Anime</span>
                                        </div>
                                        <h3 class="Title">Arknights: Fuyukomori Kaerimichi</h3>
                                    </a>
                                    <div class="Description">
                                        <div class="Title"><strong>Arknights: Fuyukomori Kaerimichi</strong></div>
                                        <p><span class="Type tv">Anime</span> <span class="Vts fa-star">4.2</span></p>
                                        <p>Segunda temporada de Arknights</p>

                                        <a class="Button Vrnmlk" href="/anime/arknights-fuyukomori-kaerimichi">VER ANIME</a>
                                    </div>
                                </article>
                            </li>
                                                    <li>
                                <article class="Anime alt B">
                                    <a href="/anime/keikenzumi-na-kimi-to-keiken-zero-na-ore-ga-otsukiai-suru-hanashi">
                                        <span class="Estreno"><span>ESTRENO</span></span>                                        <div class="Image fa-play-circle-o">
                                            <figure><img src="/uploads/animes/covers/3887.jpg" alt="Keikenzumi na Kimi to, Keiken Zero na Ore ga, Otsukiai suru Hanashi."></figure>
                                            <span class="Type tv">Anime</span>
                                        </div>
                                        <h3 class="Title">Keikenzumi na Kimi to, Keiken Zero na Ore ga, Otsukiai suru Hanashi.</h3>
                                    </a>
                                    <div class="Description">
                                        <div class="Title"><strong>Keikenzumi na Kimi to, Keiken Zero na Ore ga, Otsukiai suru Hanashi.</strong></div>
                                        <p><span class="Type tv">Anime</span> <span class="Vts fa-star">4.0</span></p>
                                        <p>Ryuto Kashima es el típico introvertido, aunque eso no impide que esté enamorado de Ruka Shirakawa, la chica más popular. Tras perder una apuesta con sus compañeros, declara su amor a Runa, y para sorpresa del chico, ¡ella acepta ser su novia y salir con él! Una relación entre dos personas ta...</p>

                                        <a class="Button Vrnmlk" href="/anime/keikenzumi-na-kimi-to-keiken-zero-na-ore-ga-otsukiai-suru-hanashi">VER ANIME</a>
                                    </div>
                                </article>
                            </li>
                                                    <li>
                                <article class="Anime alt B">
                                    <a href="/anime/goblin-slayer-ii">
                                        <span class="Estreno"><span>ESTRENO</span></span>                                        <div class="Image fa-play-circle-o">
                                            <figure><img src="/uploads/animes/covers/3886.jpg" alt="Goblin Slayer II"></figure>
                                            <span class="Type tv">Anime</span>
                                        </div>
                                        <h3 class="Title">Goblin Slayer II</h3>
                                    </a>
                                    <div class="Description">
                                        <div class="Title"><strong>Goblin Slayer II</strong></div>
                                        <p><span class="Type tv">Anime</span> <span class="Vts fa-star">4.8</span></p>
                                        <p>Segunda temporada de Goblin Slayer</p>

                                        <a class="Button Vrnmlk" href="/anime/goblin-slayer-ii">VER ANIME</a>
                                    </div>
                                </article>
                            </li>
                                            </ul>
        </main>
        <!--</main>-->



    </div>
</div>

<script type='text/javascript' src='//marshwhisper.com/2d/54/fd/2d54fde113170ff20a3073c093cebf13.js'></script>




    </div>
    <!--</Body>-->

    <!--<Footer>-->
    <footer class="Footer">
        <div class="Container">
            <div class="BX Row BFluid Sp20 NMb">
                <div>
				<p>
				  <span>Anime Online</span> - Ningún vídeo se encuentra alojado en nuestros servidores.
				</p>
<nav class="mnftxt">
<a href="/condiciones-de-uso.html">Términos y Condiciones</a> 
<a href="/politica-de-privacidad.html">Política de Privacidad</a> 
<a href="/sobre-animeflv.html">Sobre AnimeFLV</a>
</nav>
                </div>
                <ul class="ListSocial BFixed">
                    <li><a href="https://www.facebook.com/armyanime.jp/" target="_blank" class="fa-facebook"></a></li>
                    <li><a href="https://www.youtube.com/c/kudasai" target="_blank" class="fa-youtube"></a></li>
                </ul>
            </div>
        </div>
        
        

    </footer>
    <!--</Footer>-->
    
</div>
<!--</all>-->

<!-- Javascript -->
<script>var is_user = false;</script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
<script>
        $(document).ready(function(e) {   
            $(".twtch .btn").click(function(){
              $(".twtch-bx").remove();
			  $("#twitch-chat-embed").remove();
            });
			
			$(document).on('fullscreenchange', function(e){
				var urlSrc = $(e.target).attr('src');
				if(urlSrc.indexOf('twitch') === -1){
					$(".twtch-bx").remove();
					$("#twitch-chat-embed").remove();
				}
			});
        });
        </script>
<script type="text/javascript" src="/assets/animeflv/js/jquery.typewatch.min.js"></script>
<script type="text/javascript" src="/assets/animeflv/js/scrlbr.js"></script>
<script type="text/javascript" src="/assets/animeflv/js/jquery.bxslider.min.js"></script>
<script type="text/javascript" src="/assets/animeflv/js/percircle.min.js"></script>
<script type="text/javascript" src="/assets/animeflv/js/funciones.js?v=1.1.23"></script>
<script type="text/javascript" src="/assets/animeflv/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/assets/animeflv/js/alertify.js"></script>


<!--[if lt IE 9]><script type="text/javascript" src="/assets/animeflv/js/ie/css3mq.js"></script>
<![endif]-->
<!--[if lte IE 9]><script type="text/javascript" src="/assets/animeflv/js/ie/ie.js"></script>
<![endif]-->








<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-WRD6JCRSM0"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-WRD6JCRSM0');
</script>


<noscript>
<div style="display:none;">
<img src="//pixel.quantserve.com/pixel/p--mN3UcHCw6ueQ.gif" border="0" height="1" width="1" alt="Quantcast"/>
</div>
</noscript>
<!-- End Quantcast tag -->

<script id="dsq-count-scr" src="//https-animeflv-net.disqus.com/count.js" async></script>
</body>
</html>
`
