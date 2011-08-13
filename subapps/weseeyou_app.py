import web
from web import form

from decimal import Decimal
import json
import csv
from itertools import izip

#url_root = /farmville
urls = ( "/(.*)/(.*)/?",  "Error",
         "/?",            "Firethreat" )

#===============================================================#
# Firethreat
#===============================================================#
class Firethreat:
    def GET(self):
        render = web.ctx.session['firender']
        return render.home()

class Pricing:
    def GET(self):
        render = web.ctx.session['firender']
        return render.pricing()

class About:
    def GET(self):
        render = web.ctx.session['firender']
        return render.about()

class Login:
    def GET(self):
        render = web.ctx.session['firender']
        return render.login()

class Signup:
    def GET(self):
        render = web.ctx.session['firender']
        return render.signup()

#===============================================================#
# Error
#===============================================================#
class Error:
    def GET(self, username, store, product, path):
        """
        """
        raise web.seeother(web.ctx.homedomain + "/404")

subapp = web.application(urls, globals())

