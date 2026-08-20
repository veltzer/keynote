#!/usr/bin/python3

""" Print the tag name for the build. """

import subprocess  # for check_output, DEVNULL


def get_version():
    """ Return git describe output, or 'test' when unavailable. """
    try:
        ver=subprocess.check_output(['git', 'describe'],stderr=subprocess.DEVNULL).rstrip()
        return ver
    except (subprocess.CalledProcessError, OSError):
        return 'test'

print(get_version())
