require  'haml'
class HTML
  attr_accessor :input, :output, :hints
  def initialize()
    @main = '../../deguide/app/view/templates/application.html.haml'
    @appUI  = '../../deguide/app/view/templates/deguideUI.html.haml'
    @output = '../../deguide/app/public/deguide.html'
    @hints = ['width', 'columns', 'height', 'rows','margin', 'gutters']
  end
  def render
    contents = File.read(@main)
    engine = Haml::Engine.new(contents)
    # create regular html page
    out = File.new(@output, 'w+', 0644)
    File.write(out, engine.render(self))
  end
  def add_fragment(segm)
    contents = File.read(segm);
    Haml::Engine.new(contents).render(self)
  end
end
HTML.new().render