require  'haml'
require '../../deguide/app/view/svgIcons/svg'
class HTML
  attr_accessor :input, :output, :hints, :svg_common
  def initialize()
    @main = '../../deguide/app/view/templates/application.html.haml'
    @appUI  = '../../deguide/app/view/templates/deguideUI.html.haml'
    @output = '../../deguide/app/public/deguide.html'
    @hints = ['width', 'columns', 'height', 'rows','margin', 'gutters']
    @icons = [Svg.icon_width, Svg.icon_columns, Svg.icon_marginBottom, Svg.icon_marginRight, 
    Svg.icon_HGutter, Svg.icon_height, Svg.icon_rows, Svg.icon_marginTop, 
    Svg.icon_marginLeft, Svg.icon_VGutter]
    @quickSettingIcon = [Svg.icon_leftBorder, Svg.icon_HMidPoint, Svg.icon_topBorder,
    Svg.icon_clear, Svg.icon_bottomBorder, Svg.icon_VMidPoint, Svg.icon_rightBorder]
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