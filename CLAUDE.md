# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Run the PPT generation script
```bash
python ppt.py
```

### Adjust font size for existing PPT files
```python
# Scale down by 20%
adjust_font_size('filename.pptx', 0.8)

# Scale up by 20% 
adjust_font_size('filename.pptx', 1.2)

# Quick adjustments
quick_font_adjust('filename.pptx', 'small')   # 80% size
quick_font_adjust('filename.pptx', 'medium')  # 90% size
quick_font_adjust('filename.pptx', 'large')   # 110% size
quick_font_adjust('filename.pptx', 'xlarge')  # 120% size
```

## Architecture

This is a PowerPoint generation tool for JLS Academy presentations. The main script `ppt.py` provides:

1. **PPT Generation**: Creates presentations with customizable font sizes using the `python-pptx` library
2. **Font Adjustment**: Modifies font sizes in existing PPT files with scaling factors
3. **Data Management**: Contains 100 pre-defined slides with educational content about middle school strategy

Key functions:
- `create_presentation_with_font_control()`: Generate PPT with specific font sizes
- `adjust_font_size()`: Scale all fonts in existing PPT by a factor
- `quick_font_adjust()`: Preset size adjustments (small/medium/large/xlarge)

The script uses Korean content focused on educational consulting and middle school admission strategies.