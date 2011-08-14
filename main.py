import web
import urllib
import json

GLOBALNAME = "Blogachoo"

web.config.debug == True

if web.config.debug:
    from reloader import PeriodicReloader

# url mapping
urls = (
    '/api/(.+)/(.+)/?', "Api",
    '/req/?',           "Request",
    '/?',               "Index", #weseeyou_app.subapp,
    '/(.*)',            "Error",
    )

app = web.application(urls, globals())

# global vars
the_globals = { 'ctx': web.ctx,
                'globalname': GLOBALNAME,
                }

render = web.template.render('templates/',
                             base='layout',
                             globals=the_globals)

slender = web.template.render('templates/',
                              globals=the_globals)

the_globals['render'] = render
the_globals['slender'] = slender

def session_hook():
    web.ctx.session = { "render": render,
                        "slender": slender,
                        }

app.add_processor(web.loadhook(session_hook))

class Index:
    def GET(self):
        return render.index()


class Api:
    def GET(self, service, query):
        if service == "youtube":
            url = "https://gdata.youtube.com/feeds/api/videos?alt=json&q=" + query.replace(" ", "+") + "&orderby=relevance&max-results=10&v2";

        url = urllib.unquote(url)
        response = urllib.urlopen(url)
        data = response.read().replace("$","")
        return data

class Request:
    def GET(self):
        i = web.input()
        return self.requestGET(i.q)

    def POST(self):
        i = web.input()
        return self.requestPOST(i.q)
			
    def requestGET(self, query):
        url = urllib.unquote(query)
        response = urllib.urlopen(url)
        result = response.read()
        response.close()
        return result

    def requestPOST(self, query):
        url = urllib.unquote(query)
        base = url.split("?")[0]
        data = str(url.split("?")[-1])
        response = urllib.urlopen(url, data)
        result = response.read()
        response.close()
        return result


class Error:
    def GET (self, err):
        return "Uh oh, you can see me?! 404"

if __name__ == "__main__":
    if web.config.debug:
        PeriodicReloader()
    app.run()
