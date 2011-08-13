import web

GLOBALNAME = "We See You"

web.config.debug == True

if web.config.debug:
    from reloader import PeriodicReloader

# url mapping
urls = (
    '/?', "Index", #weseeyou_app.subapp,
    '/(.+)/?', "Error",
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

class Error:
    def GET (self, err):
        return "Uh oh, you can see me?! 404"

if __name__ == "__main__":
    if web.config.debug:
        PeriodicReloader()
    app.run()
