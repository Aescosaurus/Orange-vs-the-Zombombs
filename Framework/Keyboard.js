function Keyboard()
{
	const keymap = []
	// 
	{
		onkeydown = onkeyup = ( e ) =>
		{
			keymap[e.keyCode] = ( e.type == "keydown" )
			reallyStarted = true
		}
	}
	this.KeyCodeDown = ( code = 0 ) =>
	{
		return ( keymap[code] )
	}
	this.KeyIsPressed = ( theChar = "" ) =>
	{
		return( this.KeyCodeDown( theChar.charCodeAt( 0 ) ) )
	}
	this.KeyDown = ( theChar = "" ) =>
	{
		return( this.KeyIsPressed( theChar ) )
	}
	this.AnyAreDown = ( theChars = [] ) =>
	{
		for( let c in theChars )
		{
			if( this.KeyCodeDown( theChars[c] ) )
			{
				return( true )
			}
		}

		return( false )
	}
}

Keyboard.W = 87
Keyboard.S = 83
Keyboard.A = 65
Keyboard.D = 68

Keyboard.I = 73
Keyboard.K = 75
Keyboard.J = 74
Keyboard.L = 76

Keyboard.Up = 38
Keyboard.Down = 40
Keyboard.Left = 37
Keyboard.Right = 39

Keyboard.Space = 32