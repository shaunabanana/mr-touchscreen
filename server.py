import asyncio
import websockets

async def echo(websocket, path):
    async for message in websocket:
        print(message);

start_server = websockets.serve(echo, "localhost", 5555)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()