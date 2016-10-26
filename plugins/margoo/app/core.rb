require  'haml'
require '../../deguide/app/view/svgIcons/svg'
class HTML
  attr_accessor :input, :output, :hints, :svg_common
  def initialize()
    @main = '../../deguide/app/view/templates/application.html.haml'
    @appUI  = '../../deguide/app/view/templates/deguideUI.html.haml'
    @output = '../../deguide/app/public/deguide.html'
    @quickGuideID = ['left','row-mid','top', 'clear-btn',
    'bottom', 'col-mid', 'right']
    @colLeftID = ['height', 'rows', 'margin_top', 'margin_bottom', 'vert_gutters']
    @colRightID = ['width', 'columns', 'margin_left', 'margin_right', 'horiz_gutters']    
    @colRightIcons = [Svg.icon_width, Svg.icon_columns,Svg.icon_marginLeft,  Svg.icon_marginRight, 
    Svg.icon_HGutter]
    @colLeftIcons = [Svg.icon_height, Svg.icon_rows, Svg.icon_marginTop, 
    Svg.icon_marginBottom, Svg.icon_VGutter]
    @quickGuideIcons = [Svg.icon_leftBorder, Svg.icon_rowMidPoint, Svg.icon_topBorder,
    Svg.icon_clear, Svg.icon_bottomBorder, Svg.icon_columnMidPoint, Svg.icon_rightBorder]
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