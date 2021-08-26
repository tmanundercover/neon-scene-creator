export type EnvConfig = {
  firebaseFunctionsBaseUrl: string | undefined
}

const localConfig: EnvConfig = {
  firebaseFunctionsBaseUrl: 'http://localhost:5001/scene-creators-83d41/us-central1/app',
}

const prodConfig: EnvConfig = {
  firebaseFunctionsBaseUrl: 'https://us-central1-scene-creators-83d41.cloudfunctions.net/app',
}

const config = process.env.ENVIRONMENT === 'development' ? localConfig : prodConfig

export default config
