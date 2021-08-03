<?php
/*
Plugin Name: DIY EZ Web Components
Plugin URI:  https://undead.institute/diy-ez-web-components/
Description: Easily Add Web Components to Your WordPress Site
Version:     1.0.0
Author:      John Rhea
Author URI:  https://johnrhea.com
License:     GPL2
License URI: https://www.gnu.org/licenses/old-licenses/gpl-2.0.html
*/

/** How to use this template **/
/*
1. Set the $webcompname variable to your web component's name e.g. zombie-profile for <zombie-profile></zombie-profile>
2. Put your JavaScript in the diy-ezwebcomp.js file. Or change $path2js to the path to your js file
3. Put any global CSS in the diy-ezwebcomp.css file. If not using it, set $path2style to false.
4. Paste your HTML Template content into the diy_ezwebcomp_footer() function.
5. If adding a custom block, edit diy-ezwebcomp-block.js with the fields you need and add or edit any editor styles you may need.
6. Bask in the warm glow of your awesomeness and your boss and/or client's jubilation.

*/

$webcompname = 'zombie-profile';
$path2js = 'js/diy-ezwebcomp.js';
$path2style = 'css/diy-ezwebcomp.css'; //Set $path2style to false if not using this

function diy_ezwebcomp_footer()
{
?>
  <!-- Replace me with your HTML template code -->

<?php
}
add_action('wp_footer', 'diy_ezwebcomp_footer');

wp_enqueue_script($webcompname . '_js', $path2js, '', '1.0', true);

if ($path2style) {
  wp_enqueue_style($webcompname . '_style', $path2style, '', '1.0', 'screen');
}

function add_diy_ezwebcomp_to_kses_allowed($the_allowed_tags)
{
  global $webcompname;
  $the_allowed_tags[$webcompname] = array();
  foreach ($the_allowed_tags as &$tag) {
    $tag['slot'] = true;
    $tag['part'] = true;
  }
  return $the_allowed_tags;
}
add_filter('wp_kses_allowed_html', 'add_diy_ezwebcomp_to_kses_allowed');


//Custom block PHP
function diy_ezwebcomp_register_block()
{
  global $webcompname;
  //Enqueues the JavaScript needed to build the custom block
  wp_register_script(
    'diy-ezwebcomp',
    plugins_url('diy-ezwebcomp-block.js', __FILE__),
    array('wp-blocks', 'wp-element', 'wp-editor'),
    filemtime(plugin_dir_path(__FILE__) . 'js/diy-ezwebcomp-block.js')
  );
  //Enqueues the CSS file for anything you need in the editor
  wp_register_style(
    'diy-ezwebcomp',
    plugins_url('diy-ezwebcomp-block-editor-style.css', __FILE__),
    array(),
    filemtime(plugin_dir_path(__FILE__) . 'css/diy-ezwebcomp-block-editor-styles.css')
  );
  //Registers the actual block
  register_block_type('diy-ezwebcomp/' . $webcompname, array(
    'editor_style' => 'diy-ezwebcomp',
    'editor_script' => 'diy-ezwebcomp',
  ));
}
add_action('init', 'diy_ezwebcomp_register_block');
