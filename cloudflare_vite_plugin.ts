
import {tunnel} from "cloudflared"
import path from 'path';
import type { Plugin } from "vite";
export default ({config_path,logfile_path}:{
  config_path:string,
  logfile_path:string,
})=>{
  let x:ReturnType<typeof tunnel>
  let params :Parameters<typeof tunnel>[0]
  return {
    name: 'vite-cloudflared-tunnel',
    async configureServer(server) {
      if (server.config.command === 'serve') {
        const config = path.resolve(config_path)
        const logfile = path.resolve(logfile_path)
        // debugger
        const new_params:typeof params = {
          // '--url':'localhost:5173',
          '--logfile':logfile,
          '--config':config,
          'run':null,
          // "--credentials-file": credentials_file,
          // // '--origincert':origincert,
        }
        if(params && params.toString()!=new_params.toString()){
          return
        }
        params = new_params
        if(x){
          console.log("TERMINATED OLD TUNNEL", x.stop())
        }
        
        console.log("INIT TUNNEL")
        // ;(process.env as any).VERBOSE=true
        x = tunnel(params)
        console.log("CREATED TUNNEL",await x.connections[0])
        // console.log(x)
      }
    },
  } as Plugin
}