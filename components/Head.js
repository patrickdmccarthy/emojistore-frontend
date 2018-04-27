import Head from 'next/head'

export default () =>
  <div>
    <Head>
      <title>McSocks</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet" />
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-118367130-1"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments)}
        gtag('js', new Date());

        gtag('config', 'UA-118367130-1');
      </script>
    </Head>
    <style>{`
      body {
        margin: 0;
      }

      * {
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
      }
    `}</style>
  </div>
