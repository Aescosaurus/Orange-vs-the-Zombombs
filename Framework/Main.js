// Graphics
// Keyboard
// Mouse(?)
// Audio(possibly using library)
// 

var reallyStarted = false

const g_voiceVol = 0.9
const g_soundVol = 0.3
const g_musicVol = 0.2

const fps = 30
const bgColor = "#0000BC"

const gfx = new Graphics()
const kbd = new Keyboard()
const sfx = new SoundSystem()
const theGame = new Game( gfx,kbd,sfx )

window.onload = () =>
{
	theGame.Initialize()

	setInterval( () =>
	{
		gfx.DrawRect( 0,0,
			gfx.ScreenWidth,gfx.ScreenHeight,
			bgColor )

		theGame.UpdateGame()
		theGame.PresentFrame()
	},fps / 1000.0 )
}